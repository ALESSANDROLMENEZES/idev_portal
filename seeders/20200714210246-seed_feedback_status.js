'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feedback_status', [
      {
        id: 1,
        description: 'Em avaliação'
      },
      {
        id: 2,
        description: 'Concluido'
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedback_status', null, {});
  }
};
