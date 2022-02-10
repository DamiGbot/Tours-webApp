"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    signup = _require.signup,
    login = _require.login,
    forgotPassword = _require.forgotPassword,
    resetPassword = _require.resetPassword,
    updatePassword = _require.updatePassword,
    protect = _require.protect,
    restrictTo = _require.restrictTo;

var _require2 = require('../controllers/userController'),
    getAllUsers = _require2.getAllUsers,
    getUser = _require2.getUser,
    createdUser = _require2.createdUser,
    updateUser = _require2.updateUser,
    deleteUser = _require2.deleteUser,
    updateMe = _require2.updateMe,
    deleteMe = _require2.deleteMe,
    getMe = _require2.getMe;

var router = express.Router(); // user login, reset password, signup

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword); // Protect all routes after this middleware

router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router["delete"]('/deleteMe', deleteMe); // Administrator route

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createdUser);
router.route('/:id').get(getUser).patch(updateUser)["delete"](deleteUser);
module.exports = {
  router: router
};