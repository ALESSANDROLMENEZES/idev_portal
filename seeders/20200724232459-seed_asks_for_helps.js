const faker = require('faker');
const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('asks_for_helps', [
      {
        'id': 1,
        'title': faker.random.word(),
        'description': faker.lorem.words(5),
        'userId': 1,
        'createdAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'avaliable': 1
      },
      {
        'id': 2,
        'title': faker.random.word(),
        'description': faker.lorem.words(5),
        'userId': 2,
        'createdAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'avaliable': 1
      },
      {
        'id': 3,
        'title': faker.random.word(),
        'description': faker.lorem.words(5),
        'userId': 1,
        'createdAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'avaliable': 1
      },
      {
        'id': 4,
        'title': faker.random.word(),
        'description': faker.lorem.words(5),
        'userId': 3,
        'createdAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedAt': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'avaliable': 1
      }
     ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('asks_for_helps', null, {});
  }
};
