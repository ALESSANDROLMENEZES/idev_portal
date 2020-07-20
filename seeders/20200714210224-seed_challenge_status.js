'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('challenge_status', [
      {
        id: 1,
        description: 'Disponível'
      },
      {
        id: 2,
        description: 'Concluído'
      },
      {
        id: 3,
        description: 'Expirado'
      },
      {
        id: 4,
        description: 'Bloqueado'
      },
    ], {});
    
  },
  
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('challenge_status', null, {});
  }
};
