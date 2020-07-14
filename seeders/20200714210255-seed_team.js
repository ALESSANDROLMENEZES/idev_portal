'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        challengeId:1
      },
      {
        id: 2,
        challengeId:1
      },
      {
        id: 3,
        challengeId:1
      },
      {
        id: 4,
        challengeId:1
      },
      
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
