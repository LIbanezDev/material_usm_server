'use strict';


module.exports = (sequelize, DataTypes) => {
    const Career = sequelize.define('Career', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Tipo no puede estar vacio'
                }
            }
        }
    }, {})

    Career.associate = function (models) {
        Career.hasMany(models.User, {
            foreignKey: 'careerId'
        })
        Career.hasMany(models.Subject, {
            foreignKey: 'careerId'
        })
    };
    return Career;
};
