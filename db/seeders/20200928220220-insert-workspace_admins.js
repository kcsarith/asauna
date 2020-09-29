'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WorkspaceAdmins', [
      {userId:1, workspaceId:1}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('WorkspaceAdmins', null, {});
  }
};
