'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoneColumn = sequelize.define('DoneColumn', {
    taskId: DataTypes.INTEGER,
    listOrder: DataTypes.INTEGER
  }, {});
  DoneColumn.associate = function(models) {
    // associations can be defined here
    DoneColumn.belongsTo(models.Task, { foreignKey: 'taskId' });
  };
  return DoneColumn;
};
