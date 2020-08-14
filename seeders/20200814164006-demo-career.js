'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const date = new Date()
        await queryInterface.bulkInsert('Careers', [
            {
                name: 'Informática', type: 'Tecnico Universitario',
                createdAt: date, updatedAt: date
            },
            {
                name: 'Telecomunicaciones y Redes', type: 'Tecnico Universitario',
                createdAt: date, updatedAt: date
            },
            {
                name: 'Electricidad', type: 'Tecnico Universitario',
                createdAt: date, updatedAt: date
            },
            {
                name: 'Electrónica', type: 'Tecnico Universitario',
                createdAt: date, updatedAt: date
            }
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Careers', null, {});
    }
};
