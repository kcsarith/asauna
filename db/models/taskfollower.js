'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskFollower = sequelize.define('TaskFollower', {
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  TaskFollower.associate = function (models) {
    // associations can be defined here
    TaskFollower.belongsTo(models.User, { foreignKey: 'userId' });
    TaskFollower.belongsTo(models.Task, { foreignKey: 'taskId' });
  };
  return TaskFollower;
};
