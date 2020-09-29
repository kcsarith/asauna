'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkspaceAdmin = sequelize.define('WorkspaceAdmin', {
    userId: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER
  }, {});
  WorkspaceAdmin.associate = function (models) {
    // associations can be defined here
    WorkspaceAdmin.belongsTo(models.User, { foreignKey: 'userId' });
    WorkspaceAdmin.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
  };
  return WorkspaceAdmin;
};
