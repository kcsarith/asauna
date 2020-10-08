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


// Patch List Order
router.patch('/patch_list-order', asyncHandler(async (req, res) => {
  const { sourceIndex, destinationIndex } = req.body
  const tasks = await Task.patchListOrder(sourceIndex, destinationIndex);
  // tasks.save();
  return { tasks };
}))

// Patch Name
router.patch('/patch_name', asyncHandler(async (req, res) => {
  const { taskId, newName } = req.body
  const task = await Task.patchName(taskId, newName);
  return { task };
}))

// Patch Description
router.patch('/patch_description', asyncHandler(async (req, res) => {
  const { taskId, newDescription } = req.body
  const task = await Task.patchDescription(taskId, newDescription);
  return { task };
}))


// Patch Due Date
router.patch('/patch_due-date', asyncHandler(async (req, res) => {
  const { taskId, newDueDate } = req.body
  const task = await Task.patchDueDate(taskId, newDueDate);
  return { task };
}))

// Patch Status
router.patch('/patch_status', asyncHandler(async (req, res) => {
  const { taskId, newStatus } = req.body
  const task = await Task.patchStatus(taskId, newStatus);
  return { task };
}))

// Patch Assigned to Id
router.patch('/patch_assigned-to-id', asyncHandler(async (req, res) => {
  const { taskId, newAssignedtoId } = req.body
  const task = await Task.patchAssignedToId(taskId, newAssignedtoId);
  return { task };
}))

// Patch Project Id
router.patch('/patch_project-id', asyncHandler(async (req, res) => {
  const { taskId, newProjectId } = req.body
  const task = await Task.patchProjectId(taskId, newProjectId);
  return { task };
}))

// Patch Priority
router.patch('/patch_priority', asyncHandler(async (req, res) => {
  const { taskId, newPriority } = req.body
  const task = await Task.patchPriority(taskId, newPriority);
  return { task };
}))

// Patch Parent Task Id
router.patch('/patch_parent-task-id', asyncHandler(async (req, res) => {
  const { taskId, newParentTaskId } = req.body
  const task = await Task.patchParentTaskId(taskId, newParentTaskId);
  return { task };
}))

// Patch UpdatedAt
router.patch('/patch_updated-at', asyncHandler(async (req, res) => {
  const { taskId } = req.body
  const task = await Task.patchUpdatedAt(taskId);
  return { task };
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


router.delete('/:taskId(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const task = Task.findByPk(taskId);
  await task.destroy();
}));


module.exports = router;
