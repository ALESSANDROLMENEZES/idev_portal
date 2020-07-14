const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('modules', [
      {
        id: 1,
        title: 'Introdução a javascript',
        avaliable: '1',
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        id: 2,
        title: 'Git e Github',
        avaliable: '1',
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('modules', null, {}); 
  }
};
