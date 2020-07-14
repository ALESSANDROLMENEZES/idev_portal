'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users',
    {
      id: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },{
      name: Sequelize.STRING(45),
      allowNull: false,
      defaultValue: 'username',
      comment: "null"
    },{
      email: Sequelize.STRING(80),
      allowNull: false,
      comment: "null",
      unique: true
    },
    {
      avatar: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'default',
      comment: "null"
    },
    {
      password: Sequelize.STRING(255),
      allowNull: false,
      comment: "null"
    },
    {
      linkedin: Sequelize.STRING(255),
      allowNull: true,
      comment: "null"
    },
    {
      github: Sequelize.STRING(255),
      allowNull: true,
      comment: "null"
    },
    {
      score: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    {
      xp: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    {
      admin: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    {
      active: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: '1',
      comment: "null"
    },
    {
      createdAt: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    {
      updatedAt: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    {
      coins: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '3',
      comment: "null"
    }
    );
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
