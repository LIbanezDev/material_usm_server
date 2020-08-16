'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.url.split('/').pop();
            }
        },
        extension: {
            type: DataTypes.VIRTUAL, // This field doesn't exists on the db
            get() {
                return this.url.split('.').pop();
            },
        }
    }, {})
    File.associate = function (models) {
        File.belongsTo(models.Subject, {
            foreignKey: 'subjectId'
        })
    }
    return File;
};
