const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_users', [
      {
        teamId: 1,
        userId: 1,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        teamId: 1,
        userId: 2,
        createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
      },
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('team_users', null, {});
  }
};
