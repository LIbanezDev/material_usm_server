const express = require('express')
const router = express.Router()
const db = require('../models')

const {Career} = db.sequelize.models

router.get('/', async (req, res) => {
    try {
        const careers = await Career.findAll({
            attributes:['name', 'type']
        })
        res.send({ok:true, data:careers})
    } catch (e) {

    }
})

module.exports = router
