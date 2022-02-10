"use strict";

var _require = require('../models/userModel'),
    User = _require.User;

var AppError = require('../utils/appError');

var catchAsync = require('../utils/catchAsync');

var _require2 = require('./handleFactory'),
    deleteOne = _require2.deleteOne,
    updateOne = _require2.updateOne,
    getOne = _require2.getOne,
    getAll = _require2.getAll;

var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = new Object();
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

var createdUser = function createdUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

var updateMe = catchAsync(function _callee(req, res, next) {
  var filterBody, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.password || req.body.passwordConfirm)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next(new AppError('This route is not for password update. Please use /updateMyPassword', 400)));

        case 2:
          filterBody = filterObj(req.body, 'name', 'email');
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user._id, filterBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          user = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(res.status(200).json({
            status: 'success',
            data: {
              user: user
            }
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
var deleteMe = catchAsync(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user._id, {
            active: false
          }));

        case 2:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getAllUsers = getAll(User);
var getUser = getOne(User);
var updateUser = updateOne(User);
var deleteUser = deleteOne(User);
module.exports = {
  getAllUsers: getAllUsers,
  createdUser: createdUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  updateMe: updateMe,
  deleteMe: deleteMe
};