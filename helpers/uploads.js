const gc = require('../config/cloudStorage')
const {format} = require('util')
const bucket = gc.bucket('usm-archivos')

const multer = require('multer')

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 5 * 1024 * 1024,
    },
});

const uploadFilesToGC = (filesArray, folder) => new Promise((resolve, reject) => {
    let publicURLS = []
    for (const file of filesArray) {
        const {originalname, buffer} = file
        const blob = bucket.file(`${folder}/${Date.now()}_${originalname.replace(/ /g, "_")}`)
        const blobStream = blob.createWriteStream({
            resumable: false,
        })
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
        publicURLS.push(publicUrl)
        blobStream
            .on('finish', () => {
                // Finished
            })
            .on('error', () => {
                reject(false)
            })
            .end(buffer)
    }

    if (publicURLS.length === 0) return resolve(false)
    resolve(publicURLS)
})

const deleteFileFromGC = async (fileName, folder) => {
    try {
        await bucket.file(`${folder}/${fileName}`).delete()
        return `gs://${bucket.name}/${fileName} deleted.`;
    } catch (e) {
        throw new Error(e)
    }
}

const getFilesFromGC = async (folder, delimiter = '/') => {
    const options = {
        prefix: `/${folder}`,
    };
    if (delimiter) {
        options.delimiter = delimiter;
    }
    // Lists files in the bucket, filtered by a prefix
    const [files] = await bucket.getFiles();
    files.forEach(file => {
        console.log(file.name);
    });
    return files
}

module.exports = {
    Multer,
    uploadFilesToGC,
    deleteFileFromGC,
    getFilesFromGC
}
