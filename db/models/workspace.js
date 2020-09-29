'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
  }, {});
  Workspace.associate = function (models) {
    Workspace.hasMany(models.Project, { foreignKey: 'workspaceId' });

    Workspace.belongsTo(models.User, { foreignKey: 'ownerId' });
  };
  return Workspace;
};
