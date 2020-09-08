'use strict';
const generateRandomColorHex = function getRandomInt() {
  const randomNumber = Math.floor(Math.random() * Math.floor(16777216));
  return randomNumber.toString(16).toUpperCase()
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      workspaceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Workspaces' }
      },
      listOrder: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: generateRandomColorHex()
      },
      isPublic: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};
