'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions_answers', {
      'questionId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'questions',
          key: 'id'
        }
      },
      'answerId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'answers',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('questions_answers');
  }
};
