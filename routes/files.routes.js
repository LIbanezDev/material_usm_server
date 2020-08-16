const express = require('express')
const router = express.Router()
const {Multer, uploadFilesToGC} = require('../helpers/uploads')
const db = require('../models')

const {File} = db.sequelize.models

const middle = Multer.array('archivo_exe', 5)

router.post('/upload', (req, res) => {
    // Prevent server hangs by handling errors using multer middleware
    middle(req, res, async (err) => {
        if (err) {
            return res.status(403).send({ok: false, err})
        }
        try {
            const {subjectIds} = req.body
            const subjectsIdsArray = subjectIds.split(',')

            if (!req.files || !subjectIds || (subjectsIdsArray.length !== req.files.length)) {
                return res.status(403).send({ok: false, err: {msg: 'Se requieren archivos y su asignatura correspondiente'}})
            }

            const urls = await uploadFilesToGC(req.files, 'subjects')

            const promises = []

            for(let i = 0; i < urls.length; i++){
                promises.push(File.create({
                    url: urls[i],
                    subjectId: subjectsIdsArray[i]
                }))
            }

            const filesCreated = await Promise.all(promises)
            console.log(filesCreated[0].name)
            return res.status(201).send({ok:true, msg:'Los archivos se han subido correctamente'})

        } catch (e) {
            res.send({ok:false, err:{msg:e}})
        }
    })
})

module.exports = router

