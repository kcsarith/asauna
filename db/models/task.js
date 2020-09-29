'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    status: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    assignedToId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    priority: DataTypes.STRING,
    parentTaskId: DataTypes.INTEGER,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here

    Task.hasMany(models.Task, { foreignKey: 'parentTaskId' });
    Task.hasMany(models.Comment, { foreignKey: 'taskId' });

    Task.belongsTo(models.User, { foreignKey: 'ownerId' });
    Task.belongsTo(models.User, { foreignKey: 'assignedToId' });
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
    Task.belongsTo(models.Task, { foreignKey: 'parentTaskId' });
  };
  return Task;
};
