const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const db = require('../models')
const io = require('../app')
const uploadFile = require('../helpers/uploadFileToGC')

// Models
const {User} = db.sequelize.models

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) return res.status(401).send({ok: false, err: {msg: 'Ingrese usuario y contraseña'}})

        const userDB = await User.findOne({where: {username}})

        if (!userDB) {
            return res.send({ok: false, err: {msg: 'Usuario o pass incorrectas'}})
        }

        const encryptedPassword =
            crypto.pbkdf2Sync(password, userDB.salt, 10000, 64, 'sha1')
                .toString('base64')

        if (encryptedPassword !== userDB.password) {
            return res.send({ok: false, err: {msg: 'Usuario o pass incorrectas'}})
        }
        return res.send({ok: true, msg: 'Login exitoso'})

    } catch (error) {
        return res.status(500).send({ok: false, err: {msg: 'Error en el servidor :('}})
    }
})

router.post('/register', async (req, res) => {
        try {
            const {name, username, age, password, career: careerId} = req.body

            // Generate random string (salt)
            const salt = crypto.randomBytes(16).toString('base64')

            // Encrypt password using salt
            const encryptedPassword =
                crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1')
                    .toString('base64')


            let image
            if (req.file && Object.keys(req.file).length > 0) {
                // Upload file to google cloud users folder
                const archivo_exe = req.file
                image = await uploadFile(archivo_exe, 'users')
            } else {
                // Set default avatar as image url
                image = 'https://storage.googleapis.com/usm-archivos/users/default-avatar.png'
            }

            await User.create({
                name,
                username,
                age,
                password: encryptedPassword,
                salt,
                image,
                careerId,
            })

            // Emit broadcast! :)
            io.sockets.emit('alerta', {
                variant: 'success',
                msg: 'Un usuario se ha registrado!'
            })

            res.status(201).send({ok: true, msg: 'Registrado exitosamente'})

        } catch (error) {
            if (error) {
                if (error.ok !== null) {
                    const {message: msg} = error.errors[0]
                    return res.status(403).send({ok: false, err: {msg}})
                }
                return res.status(403).send({ok: false, err:error})
            }
            res.status(500)
        }
    }
)

module.exports = router
