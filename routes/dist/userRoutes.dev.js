"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    signup = _require.signup,
    login = _require.login,
    forgotPassword = _require.forgotPassword,
    resetPassword = _require.resetPassword,
    updatePassword = _require.updatePassword,
    protect = _require.protect;

var _require2 = require('../controllers/userController'),
    getAllUsers = _require2.getAllUsers,
    getUser = _require2.getUser,
    createdUser = _require2.createdUser,
    updateUser = _require2.updateUser,
    deleteUser = _require2.deleteUser,
    updateMe = _require2.updateMe,
    deleteMe = _require2.deleteMe;

var router = express.Router(); // user login, reset password, signup

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router["delete"]('/deleteMe', protect, deleteMe); // Administrator route

router.route('/').get(getAllUsers).post(createdUser);
router.route('/:id').get(getUser).patch(updateUser)["delete"](deleteUser);
module.exports = {
  router: router
};