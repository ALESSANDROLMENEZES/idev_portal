const moment = require('moment');
const currenteDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_modules', [{
      userId: 1,
      moduleId: 1,
      createdAt: moment(currenteDate).format('YYYY-MM-DD hh:mm:ss'),
      updatedAt:moment(currenteDate).format('YYYY-MM-DD hh:mm:ss')
    }], {});
    
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_modules', null, {});   
  }
};
