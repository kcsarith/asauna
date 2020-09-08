'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      { name: `private`, ownerId: 1, workspaceId: 1, listOrder: 1, color: '#beb595', isPublic: false },
      { name: `First Project`, ownerId: 1, workspaceId: 1, listOrder: 2, color: '#a2f267', isPublic: true },
      { name: `Second Project`, ownerId: 1, workspaceId: 2, listOrder: 1, color: '#badcd6', isPublic: true }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
