'use strict';
module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define('Progress', {
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    summary: DataTypes.TEXT,
    projectId: DataTypes.INTEGER
  }, {});
  Progress.associate = function (models) {
    // associations can be defined here
    Progress.belongsTo(models.User, { foreignKey: 'ownerId' });
    Progress.belongsTo(models.Project, { foreignKey: 'projectId' });
  };
  return Progress;
};
