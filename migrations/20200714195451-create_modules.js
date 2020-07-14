'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modules', {
      'id':{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      'title':{
        type: Sequelize.STRING(80),
        allowNull: false,
        comment: "null"
      },
      'avaliable':{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'createdAt':{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      'updatedAt':{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      }
    }
    );
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('modules');
  }
};
