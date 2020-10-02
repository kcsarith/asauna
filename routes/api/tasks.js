const express = require('express');
const router = express.Router();

const { Task, User, TaskFollower, Project } = require('../../db/models');
const { Op } = require('sequelize');

const asyncHandler = require('express-async-handler');

//CREATE
router.post('/', asyncHandler(async (req, res) => {
  const { name, description, ownerId, projectId } = req.body;
  const task = await Task.create({ name, description, ownerId, projectId });
  return res.json({ task })
}))

//READ
//	read all tasks
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: [{ model: User, as: 'Assigner' }, { model: User, as: 'Assignee' }, { model: Project }],
    order: [
      ['listOrder', 'DESC'],
    ],
  });
  return res.json({ tasks });
}))

//	Read single task
router.get('/:taskId(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const task = await Task.findByPk(taskId, {
    include: [{ model: User, as: 'Assigner' }, { model: User, as: 'Assignee' }, { model: Project }],
  });
  res.json({ task });
}))

// UPDATE
router.put('/edit/:taskId(\\d+)', asyncHandler(async (req, res, next) => {
  const taskId = parseInt(req.params.taskId, 10);
  let { name, description, dueDate, status, ownerId, projectId, priority, parentTaskId } = req.body;
  Project.findByPk(taskId)
    .then((task) => {
      task.name = name;
      task.description = description;
      task.dueDate = dueDate;
      task.status = status;
      task.ownerId = ownerId;
      task.projectId = projectId;
      task.priority = priority;
      task.parentTaskId = parentTaskId;

      task.update({
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        ownerId: task.ownerId,
        projectId: task.projectId,
        priority: task.priority,
        parentTaskId: task.parentTaskId,
      }, { where: { id: taskId } })
        .then(task => {
          res.json({ task });
        }).catch(next);
    })
}))




//GET Followers
router.get('/followers/:taskId(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const taskFollowers = await TaskFollower.findAll({
    include: [{ model: User }, { model: Task }],
    where: {
      taskId: {
        [Op.eq]: taskId
      }
    }
  });
  res.json({ taskFollowers });
}));

//DELETE FOLLOWER
router.delete('ZZZZZZZ', asyncHandler(async (req, res) => {


}));

//DELETE ALL FOLLOWERS
router.delete('ZZZZZZZZZ', asyncHandler(async (req, res) => {

  res.json({})
}))

module.exports = router;
