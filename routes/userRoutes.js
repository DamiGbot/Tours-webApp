const express = require('express');

const {
  getAllUsers,
  getUser,
  createdUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createdUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  router,
};
