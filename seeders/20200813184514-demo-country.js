'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Countries', [
            {
                name: 'Chile', createdAt: new Date(), updatedAt: new Date()
            },
            {
                name: 'Argentina', createdAt: new Date(), updatedAt: new Date()
            },
            {
                name: 'Brazil', createdAt: new Date(), updatedAt: new Date()
            },
            {
                name: 'Angola', createdAt: new Date(), updatedAt: new Date()
            },
            {
                name: 'Guinea', createdAt: new Date(), updatedAt: new Date()
            },
            {
                name: 'España', createdAt: new Date(), updatedAt: new Date()
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Countries', null, {});
    }
};
