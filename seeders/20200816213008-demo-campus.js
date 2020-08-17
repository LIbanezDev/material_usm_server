'use strict';
const {campuses} = require('../data/usm')
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Campuses', campuses);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Campuses', null, {});
    }
};
