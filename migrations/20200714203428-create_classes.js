'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'title': {
        type: Sequelize.STRING(80),
        allowNull: false,
        comment: "null"
      },
      'subtitle': {
        type: Sequelize.STRING(80),
        allowNull: false,
        comment: "null"
      },
      'resume': {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "null"
      },
      'text': {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "null"
      },
      'code': {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "null"
      },
      'slides': {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "null"
      },
      'video': {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "null"
      },
      'score': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'xp': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('classes');
  }
};
