'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    parentCommentId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.hasMany(models.Comment, { foreignKey: 'parentCommentId' });


    Comment.belongsTo(models.User, { foreignKey: 'ownerId' });
    Comment.belongsTo(models.Task, { foreignKey: 'taskId' });
    Comment.belongsTo(models.Comment, { foreignKey: 'parentCommentId' });
  };
  return Comment;
};
