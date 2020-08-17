'use strict';
const { format, render, cancel, register } = require('timeago.js');

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
            type: DataTypes.VIRTUAL, // This field doesn't exists on the db
            get() {
                return this.url.split('/').pop();
            }
        },
        extension: {
            type: DataTypes.VIRTUAL, // This field doesn't exists on the db
            get() {
                return this.url.split('.').pop();
            },
        },
        createdAtFormated: {
            type: DataTypes.VIRTUAL,
            get() {
                return format(this.createdAt)
            }
        },
    }, {})
    File.associate = function (models) {
        File.belongsTo(models.Subject, {
            foreignKey: 'subjectId'
        })
    }
    return File;
};
