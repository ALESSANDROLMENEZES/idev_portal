'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questionnaires_questions', [
      {
        questionnaireId: 1,
        questionId: 1
      },
      {
        questionnaireId: 1,
        questionId: 2
      },
      {
        questionnaireId: 1,
        questionId: 3
      },
      {
        questionnaireId: 1,
        questionId: 4
      },
      {
        questionnaireId: 1,
        questionId: 5
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questionnaires_questions', null, {});
  }
};
