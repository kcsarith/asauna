const express = require('express');
const router = express.Router();

const { Workspace, WorkspaceAdmin, WorkspaceMember, User } = require('../../db/models');
const { Op } = require('sequelize');

const asyncHandler = require('express-async-handler');


//CREATE WORKSPACE
router.post('/', asyncHandler(async (req, res) => {
    const { name, ownerId } = req.body;
    const workspace = await Workspace.create({ name, ownerId });
    return res.json({ workspace });
}));

//READ ALL WORKSPACES
router.get('/', asyncHandler(async (req, res) => {
    const workspaces = await Workspace.findAll({
        include: [{ model: User }]
    });
    return res.json({ workspaces });
}))

router.get('/:workspaceId', asyncHandler(async (req, res) => {
    const workspaceId = parseInt(req.params.workspaceId, 10);
    const workspace = await Workspace.findByPk(workspaceId, { include: { model: User } });
    return res.json({ workspace });
}))

router.get('/owner/:ownerId', asyncHandler(async (req, res) => {
    const ownerId = parseInt(req.params.ownerId, 10);
    const workspaces = await Workspace.findAll({
        where: {
            ownerId: {
                [Op.eq]: ownerId
            }
        },
        include: { model: User },
    });
    return res.json({ workspaces });
}))

module.exports = router;
