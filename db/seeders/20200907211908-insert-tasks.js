'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      { name: "Dance in Central Park", description: "Test Decription 1", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Complete an Ironman Triathlon", description: "Test Decription 2", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "Stand on Kjeragbolten Rock in Norway", description: "Test Decription 3", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Try all of Omnivore's Top 100", description: "Test Decription 4", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Talk to a Stranger in Starbucks", description: "Test Decription 5", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "Go on a Mother-Daughter Vacation", description: "Test Decription 6", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Do Some Time in the Peace Corps", description: "Test Decription 7", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Throw a Boomerang and Catch It", description: "Test Decription 8", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "Run a Mile Without Stopping", description: "Test Decription 9", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Become a Billionaire", description: "Test Decription 10", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Learn to Use a Pogo Stick", description: "Test Decription 11", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "Be on Webcam With Someone For Twenty Four Hours", description: "Test Decription 12", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Become Fluent in Dutch", description: "Test Decription 13", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Own a Vintage Automobile", description: "Test Decription 14", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "Reach all Six Provinces of the Bicol Region", description: "Test Decription 15", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Make Parents Breakfast in Bed", description: "Test Decription 16", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Hold a Dangerous Snake Around my Neck", description: "Test Decription 17", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
      { name: "See Stonehenge", description: "Test Decription 18", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "High", parentTaskId: null, },
      { name: "Eat a Pastry Under the Eiffel Tower", description: "Test Decription 19", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Low", parentTaskId: null, },
      { name: "Join a Gym", description: "Test Decription 20", dueDate: new Date(), status: "Incomplete", ownerId: 1, projectId: 1, priority: "Medium", parentTaskId: null, },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
