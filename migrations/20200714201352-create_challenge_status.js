'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('challenge_status', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null"
      },
      'description': {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "null"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('challenge_status');
  }
};
