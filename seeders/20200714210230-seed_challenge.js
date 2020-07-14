const faker = require('faker');
const currentDate = new Date();
const moment = require('moment');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('challenges', [
      {
        id:1,
        title:'Desafio I',
        subtitle:'Algorítmo javascript',
        slides:'https://docs.google.com/presentation/d/e/2PACX-1vSTqsQX11LOJaHIQeLIL9wj6l4OfIKfGBb8p_i5dU3nRugsYAlUnjSUEJxg1u6lNcRyg3klcdgUsq3S/embed?',
        text:faker.lorem.text,
        score:140,
        expiresAt:moment(currentDate).add(7, "days"),
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        xp :1,
        moduleId:1,
        statusId:1,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('challenges', null, {});   
  }
};
