'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Workspaces', [
      { name: "Workspace 1", ownerId: 1 },
      { name: "Workspace 2", ownerId: 1 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Workspaces', null, {});
  }
};
