const express = require('express');
const asyncHandler = require('express-async-handler');

const { Task } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res, _next) {
  const tasks = await Task.findAll();
  res.json({ tasks });
}));

module.exports = router;
