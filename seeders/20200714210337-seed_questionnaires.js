const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questionnaires', [
      {
        id:1,
        classId:1, 
        title:'Questionário de fixação',
        createdAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt:moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        avaliable:'1',
      }
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questionnaires', null, {});
  }
};
