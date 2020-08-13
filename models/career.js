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
                    args: [120],
                    msg: 'Nadie ha vivido mas de 122 años'
                },                  // only allow values <= 23
                min: {
                    args: [18],
                    msg: 'Debes ser mayor de 18 años'
                },                  // only allow values >= 23
                isNumeric: {
                    msg: 'La edad debe ser un numero'
                }
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    Career.associate = function (models) {
        Career.belongsTo(models.Team)
    };
    return Career;
}




