'use strict';
module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        name: {
            type: DataTypes.STRING,
            isString: {
                msg: 'Debe ser un texto'
            }
        },
        flag: {
            type: DataTypes.STRING,
            isUrl: {
                msg: 'La imagen debe ser una URL'
            }
        },
    }, {})
    Country.associate = function (models) {
        Country.hasMany(models.Team)
    };
    return Country;
};
