"use strict";

var crypto = require('crypto');

var _require = require('util'),
    promisify = _require.promisify;

var jwt = require('jsonwebtoken');

var _require2 = require('../models/userModel'),
    User = _require2.User;

var AppError = require('../utils/appError');

var catchAsync = require('../utils/catchAsync');

var sendEmail = require('../utils/email.js');

var signToken = function signToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(function _callee(req, res, next) {
  var newUser, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt,
            role: req.body.role
          }));

        case 2:
          newUser = _context.sent;
          token = signToken(newUser._id);
          res.status(201).json({
            status: 'success',
            token: token,
            data: {
              user: newUser
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = catchAsync(function _callee2(req, res, next) {
  var _req$body, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Please provide email and password', 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 10:
          _context2.t0 = !_context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Invalid error or password', 401)));

        case 13:
          token = signToken(user._id);
          res.status(200).json({
            status: 'success',
            token: token
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.protect = catchAsync(function _callee3(req, res, next) {
  var token, decoded, currentUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // 1) if token exists
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
          }

          if (token) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next(new AppError('You are not logged in! Please log in to get access.', 401)));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(token, process.env.JWT_SECRET));

        case 5:
          decoded = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 8:
          currentUser = _context3.sent;

          if (currentUser) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", next(new AppError('The user belonging to this token does no longer exist.', 401)));

        case 11:
          if (!currentUser.changedPasswordAfter(decoded.iat)) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", next(new AppError('User recently changed password! Please log in again.', 401)));

        case 13:
          req.user = currentUser;
          next();

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});

exports.restrictTo = function () {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

exports.forgotPassword = function _callee4(req, res, next) {
  var email, user, resetToken, resetUrl, message;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.body.email;

          if (email) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", next(new AppError('Please input a valid email.', 400)));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context4.sent;

          if (user) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(new AppError('There is no user with this email.'), 404));

        case 8:
          resetToken = user.createPasswordResetToken();
          _context4.next = 11;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 11:
          resetUrl = "".concat(req.protocol, "://").concat(req.get('host'), "/api/v1/users/resetPassword/").concat(resetToken);
          message = "Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ".concat(resetUrl, ".\nIf you didn't forget your password, please ignore this email!");
          _context4.prev = 13;
          _context4.next = 16;
          return regeneratorRuntime.awrap(sendEmail({
            email: email,
            subject: 'your password reset token (valid for 10 mins)',
            message: message
          }));

        case 16:
          _context4.next = 24;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](13);
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save({
            validateBeforeSave: false
          });
          return _context4.abrupt("return", next(new AppError('There was an error sending the email. Try again later ')));

        case 24:
          res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
          });

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[13, 18]]);
};

exports.resetPassword = catchAsync(function _callee5(req, res, next) {
  var hashedToken, user, token;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context5.sent;
          console.log(Date.now(), user);

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new AppError('The token is invalid or has expired', 400)));

        case 7:
          user.password = req.body.password;
          user.passwordConfirm = req.body.passwordConfirm;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          _context5.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          token = signToken(user._id);
          res.status(200).json({
            status: 'success',
            token: token
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  });
});