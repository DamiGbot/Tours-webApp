"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    signup = _require.signup,
    login = _require.login,
    forgotPassword = _require.forgotPassword;

var _require2 = require('../controllers/userController'),
    getAllUsers = _require2.getAllUsers,
    getUser = _require2.getUser,
    createdUser = _require2.createdUser,
    updateUser = _require2.updateUser,
    deleteUser = _require2.deleteUser;

var router = express.Router(); // user login, reset password, signup

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword); // Administrator route

router.route('/').get(getAllUsers).post(createdUser);
router.route('/:id').get(getUser).patch(updateUser)["delete"](deleteUser);
module.exports = {
  router: router
};