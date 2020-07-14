'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'description': {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "null"
      },
      'createdAt': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      'updatedAt': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      'avaliable': {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1',
        comment: "null"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('answers');
  }
};
