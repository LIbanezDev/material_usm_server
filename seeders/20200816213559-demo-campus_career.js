'use strict';
const {careers_campuses} = require('../data/usm')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('CampusCareers', careers_campuses);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('CampusCareers', null, {});
    }
};
