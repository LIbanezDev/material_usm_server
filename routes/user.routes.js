const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const db = require('../models')
const {io} = require('../app')
const {Multer, uploadFilesToGC} = require('../helpers/uploads')


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

const middle = Multer.array('archivo_exe', 1)

router.post('/register', (req, res) => {
        // Prevent server hangs by handling errors using multer middleware
        middle(req, res, async (err) => {
            if (err) {
                return res.send({ok: false, err})
            }
            try {
                const {name, username, age, password, career: careerId} = req.body

                // Generate random string (salt)
                const salt = crypto.randomBytes(16).toString('base64')

                // Encrypt password using salt
                const encryptedPassword =
                    crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1')
                        .toString('base64')

                let image = 'https://storage.googleapis.com/usm-archivos/users/default-avatar.jpg'

                const newUser = await User.create({
                    name,
                    username,
                    age,
                    password: encryptedPassword,
                    salt,
                    image,
                    careerId,
                })

                // If user uploads and image file and register process has no errors, upload file to Google Cloud
                if (req.files && req.files.length >= 1) {
                    image = await uploadFilesToGC(req.files, 'users')
                    newUser.image = image[0]
                    await newUser.save()
                }

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
                    return res.status(403).send({ok: false, err: error})
                }
                res.status(500).send({ok: false, error})
            }
        })

    }
)

module.exports = router
