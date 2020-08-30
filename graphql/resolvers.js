const {getAllFiles} = require("./helpers");

const crypto = require('crypto')

// DB
const db = require('../models')
const {Career, Subject, File, User} = db.sequelize.models

// The root provides a resolver function for each API endpoint
module.exports = {
    registerUser: async ({name, username, age, password, careerId}) => {
        const user = await User.findOne({
            attributes: ['username'],
            where: {
                username: username
            }
        })

        if (user) {
            return {Error: {code: 403, message: 'Usuario ya registrado'}}
        }

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
            careerId
        })

        const {id} = newUser

        return {
            User: {id, name, username, age, image}
        }
    },

    careers: async ({ID, type}) => {
        return await Career.findAll({
            where: {
                ...ID && {id: ID},
                ...type && {type}
            }
        })
    },

    subjects: async ({ID, careerId, semester}) => {
        return await Subject.findAll({
            where: {
                ...ID && {id: ID},
                ...careerId && {careerId},
                ...semester && {semester}
            },
            include: Career
        })
    },

    files: async (args) =>  getAllFiles(args),
    filesAmount: async (args) => {
        const files = await getAllFiles(args)
        return files.length
    }
};
