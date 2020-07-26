const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions_answers', [
      {
        questionId: 1,
        answerId: 1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 1,
        answerId: 2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 1,
        answerId: 3,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 2,
        answerId: 1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 2,
        answerId: 2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 2,
        answerId: 3,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 3,
        answerId: 1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 3,
        answerId: 2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionId: 3,
        answerId: 3,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions_answers', null, {});
  }
};
