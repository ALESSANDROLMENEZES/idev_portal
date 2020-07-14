const faker = require('faker');
const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('classes', [
      {
        id:1,
        title:'Introdução a Javascript',
        subtitle:'Front end',
        resume:faker.lorem.words(10),
        text:faker.lorem.text,
        code:`'subtitle': { type: DataTypes.STRING(80), allowNull: false, comment: "null" },`,
        slides:'https://docs.google.com/presentation/d/11srr9-8m09V7V8nXmELwUHp6-rTPAbX1uwWyE77loFY/embed',
        video:'https://www.youtube.com/embed/Fl21sUB1KHA',
        score:20,
        xp:10,
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('classes', null, {});
  }
};
