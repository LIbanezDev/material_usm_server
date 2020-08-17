const express = require('express')
const router = express.Router()
const {format} = require('timeago.js')
const db = require('../models')

const {Subject, Career} = db.sequelize.models

router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            attributes:['name', 'semester'],
            include: [{
                model:Career,
                attributes: ['name', 'type'],
                required: true
            }]
        })
        res.send({ok:true, data:subjects})
    } catch (e) {
        res.status(500).send({ok:false, e})
    }
})

module.exports = router
