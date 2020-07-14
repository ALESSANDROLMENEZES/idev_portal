'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      'id':{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'name': {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: 'username',
        comment: "null"
      },
      'email':{
        type: Sequelize.STRING(80),
        allowNull: false,
        comment: "null",
        unique: true
      },
      'avatar':{
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'default',
        comment: "null"
      },
      'password':{
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "null"
      },
      'linkedin':{
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "null"
      },
      github:{
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "null"
      },
      score:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'xp':{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'admin':{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
        comment: "null"
      },
      'active':{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1',
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
      },
      'coins':{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '3',
        comment: "null"
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
