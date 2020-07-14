'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'text': {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "null"
      },
      'rightAnswerId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'answers',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('questions');
  }
};
