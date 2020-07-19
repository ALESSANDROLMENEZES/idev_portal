'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedbacks', {
      'id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null"
      },
      'comment': {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "null"
      },
      'score': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'userId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      'statusId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'feedback_status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      'teamId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('feedbacks');
  }
};
