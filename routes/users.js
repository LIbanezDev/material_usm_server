const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const db = require('../models')

// Models
const {Team, User, Country} = db.sequelize.models

router.get('/teams', async (req, res) => {
    try {
        // Inner join teams <-> users
        const teams = await Team.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: Country,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'age'],
                    // required: true // return only records which have an associated model
                }
            ]
        })
        res.send({ok: true, teams})
    } catch (err) {
        res.send({ok: false, err})
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'age'],
            include: {
                model: Team,
                attributes: ['id', 'name']
            }
        })
        res.send({ok: true, users})
    } catch (err) {
        res.send({ok: false, err})
    }
})
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const userDB = await User.findOne({where: {username: username}})

        if (!userDB) {
            return res.send({ok: false, err: {msg: 'Usuario o pass incorrectas'}})
        }

        const passKey = crypto.pbkdf2Sync(password, userDB.salt, 10000, 64, 'sha1')
        const encryptedPassword = passKey.toString('base64')

        if (encryptedPassword !== userDB.password) {
            return res.send({ok: false, err: {msg: 'Usuario o pass incorrectas'}})
        }
        return res.send({ok: true, msg: 'Login exitoso'})
    } catch (error) {

    }
})

router.post('/register', async (req, res) => {
    try {
        const {username, age, password, team: TeamId} = req.body

        // Generate random string (salt)
        const buffer = await crypto.randomBytes(16)
        const salt = buffer.toString('base64')

        // Encrypt password using salt
        const passKey = await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1')
        const encryptedPassword = passKey.toString('base64')

        await User.create({
            username,
            age,
            salt,
            password: encryptedPassword,
            TeamId
        })

        return res.status(201).send({ok: true, msg: 'Registrado exitosamente'})

    } catch (error) {
        if (!error.ok) {
            const {message: msg} = error.errors[0]
            return res.status(403).send({ok: false, err: {msg}})
        }
        res.status(500)
    }
})

module.exports = router
