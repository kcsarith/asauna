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

  Task.patchListOrder = async function (taskId, taskId2) {
    const task = await Task.findByPk(taskId);
    const task2 = await Task.findByPk(taskId2);

    const taskListOrder = task.listOrder;
    const taskListOrder2 = task2.listOrder;
    if (task && task2) {
      await task.update({
        listOrder: taskListOrder2
      });
      await task2.update({
        listOrder: taskListOrder
      });
      await task.save();
      await task2.save();
      return { task, task2 }
    }
  };

  Task.patchName = async function (taskId, newName) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        name: newName
      });
      await task.save();
      return { task }
    }
  };

  Task.patchDescription = async function (taskId, newDescription) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        description: newDescription
      });
      await task.save();
      return { task }
    }
  };

  Task.patchStatus = async function (taskId, newStatus) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        status: newStatus
      });
      await task.save();
      return { task }
    }
  };

  Task.patchAssignedToId = async function (taskId, newAssignedToId) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        assignedToId: newAssignedToId
      });
      await task.save();
      return { task }
    }
  };

  Task.patchProjectId = async function (taskId, newProjectId) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        projectId: newProjectId
      });
      await task.save();
      return { task }
    }
  };

  Task.patchPriority = async function (taskId, newPriority) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        priority: newPriority
      });
      await task.save();
      return { task }
    }
  };

  Task.patchParentTaskId = async function (taskId, newParentTaskId) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        parentTaskId: newParentTaskId
      });
      await task.save();
      return { task }
    }
  };

  Task.patchUpdatedAt = async function (taskId) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        updatedAt: new Date.now
      });
      await task.save();
      return { task }
    }
  };

  // Task.create = async function ({ ownerId, workspaceId }) {
  //   const task = await Task.create({
  //     ownerId,
  //     workspaceId,
  //   });
  //   return await Task.findByPk(task.id);
  // };
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
