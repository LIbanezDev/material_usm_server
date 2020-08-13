'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Teams', [
            {countryId: 1, name: 'Rugby', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 2, name: 'Bodyboard', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 3, name: 'Surf', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 4, name: 'Pesca', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 5, name: 'Atletismo', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 1, name: 'Futbol', createdAt: new Date(), updatedAt: new Date()},
            {countryId: 1, name: 'Natacion', createdAt: new Date(), updatedAt: new Date()},
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Teams', null, {});
    }
};
