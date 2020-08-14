'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        extension: {
            type: DataTypes.VIRTUAL, // This field doesn't exists on the db
            get() {
                return this.path.split('.').pop();
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
