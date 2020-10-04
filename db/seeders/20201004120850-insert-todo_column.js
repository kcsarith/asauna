'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TodoColumns', [
      { taskId: 1, listOrder: 1 },
      { taskId: 2, listOrder: 2 },
      { taskId: 3, listOrder: 3 },
      { taskId: 4, listOrder: 4 },
      { taskId: 5, listOrder: 5 },
      { taskId: 6, listOrder: 6 },
      { taskId: 7, listOrder: 7 },
      { taskId: 8, listOrder: 8 },
      { taskId: 9, listOrder: 9 },
      { taskId: 10, listOrder: 10 },
      { taskId: 11, listOrder: 11 },
      { taskId: 12, listOrder: 12 },
      { taskId: 13, listOrder: 13 },
      { taskId: 14, listOrder: 14 },
      { taskId: 15, listOrder: 15 },
      { taskId: 16, listOrder: 16 },
      { taskId: 17, listOrder: 17 },
      { taskId: 18, listOrder: 18 },
      { taskId: 19, listOrder: 19 },
      { taskId: 20, listOrder: 20 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TodoColumns', null, {});
  }
};
