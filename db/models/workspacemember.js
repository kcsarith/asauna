'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkspaceMember = sequelize.define('WorkspaceMember', {
    userId: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER
  }, {});
  WorkspaceMember.associate = function (models) {
    // associations can be defined here
    WorkspaceMember.belongsTo(models.User, { foreignKey: 'userId' });
    WorkspaceMember.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
  };
  return WorkspaceMember;
};
