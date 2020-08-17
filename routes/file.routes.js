const express = require('express')
const router = express.Router()
const {Multer, uploadFilesToGC} = require('../helpers/uploads')
const db = require('../models')

const {File, Subject, Career} = db.sequelize.models

const middle = Multer.array('archivo_exe', 5)

router.get('/', async (req, res) => {
    try {
        const files = await File.findAll({
            attributes:['name', 'extension', 'url', 'createdAt', 'createdAtFormated'],
            include:[{
                model: Subject,
                attributes: ['name', 'semester'],
                include: {
                    model: Career,
                    attributes: ['name', 'type']
                }
            }]
        })
        res.send({ok:true, data:files})
    } catch (e) {
        res.status(500).send({ok: false, e})
    }
})


router.post('/', (req, res) => {
    // Prevent server hangs using multer middleware
    middle(req, res, async (err) => {
        if (err) {
            return res.status(403).send({ok: false, err})
        }
        try {
            const {subjectIds} = req.body
            const subjectsIdsArray = subjectIds.split(',')

            if (!req.files || !subjectIds || (subjectsIdsArray.length !== req.files.length)) {
                return res.status(403).send({
                    ok: false,
                    err: {msg: 'Se requieren archivos y su asignatura correspondiente'}
                })
            }

            const urls = await uploadFilesToGC(req.files, 'subjects')

            const promises = []
            for (let i = 0; i < urls.length; i++) {
                promises.push(File.create({
                    url: urls[i],
                    subjectId: subjectsIdsArray[i]
                }))
            }
            await Promise.all(promises)

            return res.status(201).send({ok: true, msg: 'Los archivos se han subido correctamente'})

        } catch (e) {
            res.send({ok: false, err: {msg: e}})
        }
    })
})

module.exports = router

