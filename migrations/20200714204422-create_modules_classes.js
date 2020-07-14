'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modules_classes', {
      'moduleId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'modules',
          key: 'id'
        }
      },
      'classId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'classes',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('modules_classes');
  }
};
