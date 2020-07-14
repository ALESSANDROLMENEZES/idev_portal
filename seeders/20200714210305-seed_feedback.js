const faker = require('faker');
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feedbacks', [
      {
        id: 1,
        comment: faker.lorem.text(8),
        score: 1,
        userId: 1,
        statusId: 1,
        teamId:1
      },
      {
        id: 2,
        comment: faker.lorem.text(8),
        score: 1,
        userId: 2,
        statusId: 1,
        teamId:1
      },
      {
        id: 3,
        comment: faker.lorem.text(8),
        score: 1,
        userId: 3,
        statusId: 1,
        teamId:1
      },
      {
        id: 4,
        comment: faker.lorem.text(8),
        score: 1,
        userId: 4,
        statusId: 1,
        teamId:1
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedbacks', null, {});
  }
};
