'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_users', [
      {
        teamId: 1,
        userId: 1
      },
      {
        teamId: 1,
        userId: 2
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('team_users', null, {});
  }
};
