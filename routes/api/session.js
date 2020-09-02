const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { User } = require("../../db/models");
const { handleValidationErrors } = require("../util/validation");
const { requireUser, getCurrentUser, generateToken, AuthenticationError } = require("../util/auth");
const { jwtConfig: { expiresIn } } = require('../../config');
const router = express.Router();
const validateLogin = [
  check("username").exists(),
  check("password").exists(),
];

router.get(
  "/",
  requireUser,
  asyncHandler(async function (req, res, next) {
    if (req.user) {
      return res.json({
        user: req.user
      });
    }
    next(new AuthenticationError());
  })
);



router.put(
  "/",
  validateLogin,
  handleValidationErrors,
  asyncHandler(async function (req, res, next) {
    const user = await User.login(req.body);
    const rememberMe = req.body.rememberMe;
    if (user) {
      const token = await generateToken(user);
      res.cookie("token", token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("rememberMe", rememberMe, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.json({
        user,
      });
    }
    return next(new Error('The username or password is not correct.'));
  })
);

router.delete("/", asyncHandler(async (req, res) => {
  console.log('Reached delete route')
  res.clearCookie('token');
  res.clearCookie('rememberMe');
  return res.json({ message: 'success' });
}));

module.exports = router;
