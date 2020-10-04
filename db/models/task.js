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
    listOrder: DataTypes.INTEGER,
    parentTaskId: DataTypes.INTEGER,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here

    Task.hasMany(models.Task, { foreignKey: 'parentTaskId' });
    Task.hasMany(models.Comment, { foreignKey: 'taskId' });
    Task.hasMany(models.TodoColumn, { foreignKey: 'taskId' });
    Task.hasMany(models.InProgressColumn, { foreignKey: 'taskId' });
    Task.hasMany(models.DoneColumn, { foreignKey: 'taskId' });

    Task.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Assigner' });
    Task.belongsTo(models.User, { foreignKey: 'assignedToId', as: 'Assignee' });
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
    Task.belongsTo(models.Task, { foreignKey: 'parentTaskId' });
  };
  return Task;
};
