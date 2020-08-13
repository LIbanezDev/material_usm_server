'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Equipo ya registrado'
            }
        }
    }, {});
    Team.associate = function (models) {
        Team.hasMany(models.User)
        Team.belongsTo(models.Country)
    };
    return Team;
}

