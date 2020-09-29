'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WorkspaceMembers', [
      { userId: 1, workspaceId: 1 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WorkspaceMembers', null, {});
  }
};
