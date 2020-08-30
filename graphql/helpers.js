const db = require('../models')
const {Career, Subject, File} = db.sequelize.models

const getAllFiles = async ({ID, subjectId, limit, offset, careerId, semester, careerType}) => {
    return await File.findAll({
            where: {
                ...ID && {id: ID},
                ...subjectId && {subjectId}
            },
            include: {
                model: Subject,
                where: {
                    ...semester && {semester}
                },
                include: {
                    model: Career,
                    where: {
                        ...careerId && {id: careerId},
                        ...careerType && {type: careerType}
                    }
                },
            },
            ...offset && {offset},
            ...limit && {limit}
        })
}

module.exports = {
    getAllFiles
}
