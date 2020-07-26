const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questionnaires_questions', [
      {
        questionnaireId: 1,
        questionId: 1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionnaireId: 1,
        questionId: 2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionnaireId: 1,
        questionId: 3,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionnaireId: 1,
        questionId: 4,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        questionnaireId: 1,
        questionId: 5,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questionnaires_questions', null, {});
  }
};
