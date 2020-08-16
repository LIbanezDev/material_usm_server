'use strict';
const {subjects} = require('../data/usm')
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Subjects', subjects);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Subjects', null);
    }
};
