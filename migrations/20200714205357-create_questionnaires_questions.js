'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questionnaires_questions', {
      'questionnaireId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'questionnaires',
          key: 'id'
        }
      },
      'questionId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'questions',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questionnaires_questions');
  }
};
