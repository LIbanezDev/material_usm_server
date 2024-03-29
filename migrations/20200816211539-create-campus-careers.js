'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CampusCareers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            careerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Careers',
                    key: 'id',
                    as: 'careerId'
                }
            },
            campusId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Campuses',
                    key: 'id',
                    as: 'careerId'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('CampusCareers');
    }
};
