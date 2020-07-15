const faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        id:1,
        text: faker.lorem,
        rightAnswerId:1
      },
      {
        id:2,
        text: faker.lorem,
        rightAnswerId:2
      },
      {
        id:3,
        text: faker.lorem,
        rightAnswerId:3
      },
      {
        id:4,
        text: faker.lorem,
        rightAnswerId:4
      },
      {
        id:5,
        text: faker.lorem,
        rightAnswerId:5
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
  }
};
