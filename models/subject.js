'use strict';

module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
    }, {})
    Subject.associate = function (models) {
        Subject.belongsTo(models.Career, {
            foreignKey: 'careerId',
        })
        Subject.hasMany(models.File, {
            foreignKey: 'subjectId'
        })
    }
    return Subject;
};
