'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoColumn = sequelize.define('TodoColumn', {
    taskId: DataTypes.INTEGER,
    listOrder: DataTypes.INTEGER
  }, {});
  TodoColumn.associate = function(models) {
    // associations can be defined here
    TodoColumn.belongsTo(models.Task, { foreignKey: 'taskId' });
  };
  return TodoColumn;
};
