const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const {
  getAllUsers,
  getUser,
  createdUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');

const router = express.Router();
// user login, reset password, signup

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

// Administrator route
router.route('/').get(getAllUsers).post(createdUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  router,
};
