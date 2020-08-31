'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'Demo-lition', email: 'demo@example.com', hashedPassword: createPassword(), imageUrl: '', displayBackgroundUrl: '', status: 'away', pronouns: 'she/her/hers', roles: '', departmentOrTeam: '', aboutMe: '' }),
      r({ username: 'Yusuke', email: 'yusuke@example.com', hashedPassword: createPassword(), imageUrl: '', displayBackgroundUrl: '', status: 'appearOffline', pronouns: 'he/him/his', roles: '', departmentOrTeam: '', aboutMe: '' }),
      r({ username: 'Peta', email: 'petra@example.com', hashedPassword: createPassword(), imageUrl: '', displayBackgroundUrl: '', status: 'busy', pronouns: 'they/them/theirs', roles: '', departmentOrTeam: '', aboutMe: '' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
