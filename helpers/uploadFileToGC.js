const gc = require('../config/cloudStorage')
const {format} = require('util')
const bucket = gc.bucket('usm-archivos')

/**
 * @param file  object file object that will be uploaded
 * @param folder string
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadFile = (file, folder) => new Promise((resolve, reject) => {
    const {originalname, buffer} = file
    const blob = bucket.file(`${folder}/${Date.now()}_${originalname.replace(/ /g, "_")}`)
    const blobStream = blob.createWriteStream({
        resumable: false,
    })
    blobStream
        .on('finish', () => {
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            )
            resolve(publicUrl)
        })
        .on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})

module.exports = uploadFile
