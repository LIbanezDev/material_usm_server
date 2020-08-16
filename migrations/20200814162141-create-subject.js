'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Subjects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            semester: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            careerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Careers',
                    key: 'id',
                    as: 'careerId'
                }
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Subjects');
    }
};
