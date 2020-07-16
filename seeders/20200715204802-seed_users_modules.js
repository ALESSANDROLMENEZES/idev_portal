'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_modules', [{
      userId: 1,
      moduleId: 1
    }], {});
    
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_modules', null, {});   
  }
};
