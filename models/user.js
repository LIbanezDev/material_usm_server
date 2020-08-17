'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede estar vacio'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Usuario ya ha sido utilizado'
            },
            validate: {
                notEmpty: {
                    msg: 'Usuario no puede estar vacio'
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: {
                    args: [122],
                    msg: 'Nadie ha vivido mas de 122 años'
                },
                min: {
                    args: [16],
                    msg: 'Debes ser mayor de 16 años'
                },
                isNumeric: {
                    msg: 'La edad debe ser un numero'
                }
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    User.associate = function (models) {
        User.hasOne(models.Career, {
            foreignKey: 'careerId'
        })
    };
    return User;
}



