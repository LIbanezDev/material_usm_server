'use strict';

module.exports = (sequelize, DataTypes) => {
    const Campus = sequelize.define('Campus', {
        name: {
            type: DataTypes.STRING,
            validate: {
                isString: {
                    msg: 'El nombre debe ser un string'
                },
                notEmpty: {
                    msg: 'El nombre no puede estar vacio'
                }
            }
        }
    })
    Campus.associate = models =>  {
        Campus.belongsToMany(models.Career, {
            through: models.CampusCareer
        })
    }
    return Campus;
};
