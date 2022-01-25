const express = require('express');

const { signup, login } = require('../controllers/authController');

const {
  getAllUsers,
  getUser,
  createdUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();
// user login, reset password, signup

router.post('/signup', signup);
router.post('/login', login);

// Administrator route
router.route('/').get(getAllUsers).post(createdUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  router,
};
