'use strict';
module.exports = (sequelize, DataTypes) => {
  const InProgressColumn = sequelize.define('InProgressColumn', {
    taskId: DataTypes.INTEGER,
    listOrder: DataTypes.INTEGER
  }, {});
  InProgressColumn.associate = function(models) {
    // associations can be defined here
    InProgressColumn.belongsTo(models.Task, { foreignKey: 'taskId' });
  };
  return InProgressColumn;
};
