"use strict";

var _require = require('../models/userModel'),
    User = _require.User;

var catchAsync = require('../utils/catchAsync');

var getAllUsers = catchAsync(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          res.status(200).json({
            status: 'success',
            data: {
              users: users
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

var createdUser = function createdUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

var getUser = function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

var updateUser = function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

var deleteUser = function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  createdUser: createdUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};