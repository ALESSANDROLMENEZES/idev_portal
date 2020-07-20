'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feedback_status', [
      {
        id: 1,
        description: 'Em desenvolvimento'
      },
      {
        id: 2,
        description: 'Disponível'
      },
      {
        id: 3,
        description: 'Em avaliação'
      },
      {
        id: 4,
        description: 'Avaliado'
      },
      {
        id: 5,
        description: 'Expirado'
      },
      {
        id: 6,
        description: 'Bloqueado'
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedback_status', null, {});
  }
};
