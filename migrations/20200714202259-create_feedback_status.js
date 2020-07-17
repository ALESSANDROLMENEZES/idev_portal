'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedback_status', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'description': {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "null"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('feedback_status');
  }
};
