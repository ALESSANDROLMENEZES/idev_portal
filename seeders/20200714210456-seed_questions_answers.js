'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions_answers', [
      {
        questionId: 1,
        answerId: 1
      },
      {
        questionId: 2,
        answerId: 2
      },
      {
        questionId: 3,
        answerId: 2
      },
      {
        questionId: 4,
        answerId: 1
      },
      {
        questionId: 5,
        answerId: 3
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions_answers', null, {});
  }
};
