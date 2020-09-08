'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      { message: "We all flow from one fountain Soul. All are expressions of one Love. God does not appear, and flow out, only from narrow chinks and round bored wells here and there in favored races and places, but He flows in grand undivided currents, shoreless and boundless over creeds and forms and all kinds of civilizations and peoples and beasts, saturating all and fountainizing all.", ownerId: 1, taskId: 1, parentCommentId: null },
      { message: "A preoccupation with the future not only prevents us from seeing the present as it is but often prompts us to rearrange the past.", ownerId: 1, taskId: 1, parentCommentId: null },
      { message: "The man who reads nothing at all is better educated than the man who watches nothing but Fox News.", ownerId: 1, taskId: 2, parentCommentId: null },
      { message: "Change your thoughts and you change your world.", ownerId: 1, taskId: 2, parentCommentId: null },
      { message: "A liberal is a person whose interests aren't at stake at the moment.", ownerId: 2, taskId: 3, parentCommentId: null },
      { message: "I think the first virtue is to restrain the tongue; he approaches nearest to gods who knows how to be silent, even though he is in the right.", ownerId: 2, taskId: 3, parentCommentId: null },
      { message: "Be not extravagantly high in expression of thy commendations of men thou likest, it may make the hearer's stomach rise.", ownerId: 2, taskId: 4, parentCommentId: null },
      { message: "I write entirely to find out what I'm thinking, what I'm looking at, what I see and what it means. What I want and what I fear.", ownerId: 2, taskId: 4, parentCommentId: null },
      { message: "There used to be a real me, but I had it surgically removed.", ownerId: 3, taskId: 5, parentCommentId: null },
      { message: "It is very difficult to know people and I don't think one can ever really know any but one's own countrymen. For men and women are not only themselves; they are also the region in which they are born, the city apartment or the farm in which they learnt to walk, the games they played as children, the old wives' tales they overheard, the food they ate, the schools they attended, the sports they followed, the poets they read, and the God they believed in. It is all these things that have made them what they are, and these are the things that you can't come to know by hearsay, you can only know them if you have lived them.", ownerId: 3, taskId: 5, parentCommentId: null },
      { message: "What you look like on the outside is not what makes you cool at all. I mean, I had a mullet and wore parachute pants for a long, long time, and I'm doin' okay.", ownerId: 3, taskId: 6, parentCommentId: null },
      { message: "Passion kept one fully in the present, so that time became a series of mutually exclusive 'nows.'", ownerId: 3, taskId: 6, parentCommentId: null },
      { message: "It has yet to be proven that intelligence has any survival value.", ownerId: 3, taskId: 7, parentCommentId: null },
      { message: "Adapt or perish, now as ever, is nature's inexorable imperative.", ownerId: 3, taskId: 7, parentCommentId: null },
      { message: "There are two ways of exerting one's strength: one is pushing down, the other is pulling up.", ownerId: 3, taskId: 8, parentCommentId: null },
      { message: "Make yourself necessary to somebody. Do not make life hard to any.", ownerId: 3, taskId: 8, parentCommentId: null }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
