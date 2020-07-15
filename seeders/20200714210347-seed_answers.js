const moment = require('moment');
const currentDate = new Date();
const faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('answers', [
      {
        id: 1,
        description: faker.lorem.words(3),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:1
      },
      {
        id: 2,
        description: faker.lorem.words(3),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:1
      },
      {
        id: 3,
        description: faker.lorem.words(3),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:1
      },
      {
        id: 4,
        description: faker.lorem.words(3),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:1
      },
      {
        id: 5,
        description: faker.lorem.words(3),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:1
      },
    ], {});
    
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answers', null, {});
  }
};
