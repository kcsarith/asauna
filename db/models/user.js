'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          isEmail: true,
          len: [3, 255],
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          len: [1, 32],
        },
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validates: {
          len: [60, 60],
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      displayBackgroundUrl: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
      },
      pronouns: {
        type: DataTypes.STRING
      },
      roles: {
        type: DataTypes.STRING
      },
      departmentOrTeam: {
        type: DataTypes.STRING
      },
      aboutMe: {
        type: DataTypes.TEXT
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
        profile: {
          attributes: { exclude: ["hashedPassword", "updatedAt"] },
        },
      },
    }
  );

  User.associate = function (models) {
  };

  User.prototype.toSafeObject = function () {
    const {
      id,
      username,
      imageUrl,
      displayBackgroundUrl,
      pronouns,
      status,
      roles,
      departmentOrTeam,
      aboutMe
    } = this;

    return { id, username, imageUrl, displayBackgroundUrl, pronouns, status, roles, departmentOrTeam, aboutMe };
  };

  User.login = async function ({ username, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
