'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Progresses', [
      { title: "We all flow from one fountain Soul.", status: "On Track", ownerId: 1, summary: "I was so happy I could die, but decided to play a love game with brown eyes and now I'm speechless. Who would've thought a monster could make me dance in the dark..... Talk about your bad romance!", projectId: 1, },
      { title: "A preoccupation with the future prevents us from seeing the present.", status: "At Risk", ownerId: 1, summary: "I'm gonna complain to Domino's! They said I'd have my pizza before I could say 'Piping hot!'. I've said it 867 times since then and it's STILL not here!", projectId: 1, },
      { title: "The man who reads nothing at all is better educated than the man who watches nothing but Fox News.", status: "Off Track", ownerId: 2, summary: "Humans invented peanut butter and chocolate, but God put them together", projectId: 1, },
      { title: "Change your thoughts and you change your world.", status: "Off Track", ownerId: 3, summary: "The more successful you are the more they will envy you, so screw it, be the best of the best it's not like anyone can do anything about it", projectId: 1, },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Progresses', null, {});
  }
};
