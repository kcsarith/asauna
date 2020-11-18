const express = require('express');
const router = express.Router();

const { Task, User, Comment, Project, } = require('../../db/models');

const { Op } = require('sequelize');

const asyncHandler = require('express-async-handler');

router.get('/task/:taskId', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.taskId, 10);
    const comments = await Comment.findAll({
        where: {
            taskId: taskId
        },
        include: [{ model: User }],
        order: [
            ['id', 'DESC'],
        ],
    });
    return res.json({ comments });
}))

router.post('/task/:taskId', asyncHandler(async (req, res) => {
    const ownerId = req.body.ownerId;
    const taskId = parseInt(req.params.taskId, 10);
    const message = req.body.message;
    const user = User.findByPk(ownerId)
    let comment = await Comment.create({ ownerId, taskId, message });
    return res.json({ comment, user });
}))


module.exports = router;
