'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING(60).BINARY,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      displayBackgroundUrl: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      status: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      pronouns: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      roles: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      departmentOrTeam: {
        type: Sequelize.STRING(64),
        defaultValue: "",
      },
      aboutMe: {
        type: Sequelize.TEXT(),
        defaultValue: "",
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
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
