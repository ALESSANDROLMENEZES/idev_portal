const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        challengeId: 1,
        statusId:1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 2,
        challengeId: 1,
        statusId:2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 3,
        challengeId: 1,
        statusId:1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 4,
        challengeId: 1,
        statusId:3,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 5,
        challengeId: 2,
        statusId:4,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
