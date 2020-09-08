'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER,
    listOrder: DataTypes.INTEGER,
    color: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN
  }, {});
  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Progress, { foreignKey: 'projectId' });
    Project.hasMany(models.Task, { foreignKey: 'projectId' });

    Project.belongsTo(models.User, { foreignKey: 'ownerId' });
    Project.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
  };
  return Project;
};
