const express = require('express');
const router = express.Router();

const { Task, User } = require('../../db/models');
const { Op } = require('sequelize');

const asyncHandler = require('express-async-handler');

//CREATE
router.post('/new', asyncHandler(async (req, res) => {
  const { name, description, ownerId, projectId } = req.body;
  const task = await Task.create({ name, description, ownerId, projectId });
  res.json({ task })
}))

//READ
//	read all tasks
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: [{ model: User }],
  });
  res.json({ tasks });
}))

//	read single project
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = await Task.findByPk(taskId, {
    include: [{ model: User }],
  });
  res.json({ task });
}))

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




//ADD STEP
router.get('/:projectId(\\d+)/addStep/', asyncHandler(async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);
  const project = await Project.findByPk(projectId);
  const newDes = project.destructions;
  const newDesHead = project.destructionsHeadings;
  newDes.push('');
  newDesHead.push('');
  await Project.update({ destructions: newDes, destructionsHeadings: newDesHead }, { where: { id: projectId } });
  const newProject = await Project.findByPk(projectId)
  res.json({ project: newProject });
}));

//DELETE SINGLE STEP
router.delete('/:projectId(\\d+)/delete/step/:stepNum(\\d+)/', asyncHandler(async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);
  const stepNum = parseInt(req.params.stepNum, 10);
  const project = await Project.findByPk(projectId);
  const newDes = project.destructions;
  const newDesHead = project.destructionsHeadings;
  newDes.splice(stepNum - 1, 1);
  newDesHead.splice(stepNum - 1, 1);
  await Project.update({ destructions: newDes, destructionsHeadings: newDesHead }, { where: { id: projectId } });
  const newProject = await Project.findByPk(projectId)
  //might be unnecessary to findByPk again, but it worksss
  res.json({ project: newProject });
}));

//DELETE ENTIRE PROJECT
router.delete('/:projectId(\\d+)/delete', asyncHandler(async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);
  await Comment.destroy({ where: { projectId } });
  await Project.destroy({ where: { id: projectId } });
  // res.end();
  res.json({})
}))

module.exports = router;
