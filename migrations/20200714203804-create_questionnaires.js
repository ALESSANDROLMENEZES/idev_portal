'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questionnaires', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'classId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'classes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      'title': {
        type: Sequelize.STRING(45),
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
        defaultValue: '0',
        comment: "null"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('questionnaires');
  }
};
