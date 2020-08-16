'use strict';
const {careers} = require('../data/usm')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Careers', careers);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Careers', null);
    }
};
