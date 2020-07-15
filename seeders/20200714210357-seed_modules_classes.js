'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('modules_classes', [{
        moduleId: 1,
        classId: 1
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('modules_classes', null, {});
  }
};
