'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_users', {
      'teamId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      'userId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('team_users');
  }
};
