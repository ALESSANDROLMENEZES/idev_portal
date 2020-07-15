const faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        id:1,
        text: faker.lorem.sentence(5),
        rightAnswerId:1
      },
      {
        id:2,
        text: faker.lorem.sentence(5),
        rightAnswerId:2
      },
      {
        id:3,
        text: faker.lorem.sentence(5),
        rightAnswerId:3
      },
      {
        id:4,
        text: faker.lorem.sentence(5),
        rightAnswerId:4
      },
      {
        id:5,
        text: faker.lorem.sentence(5),
        rightAnswerId:5
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
  }
};
