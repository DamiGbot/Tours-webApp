"use strict";

var Review = require('../models/reviewModel');

var catchAsync = require('../utils/catchAsync');

var AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(function _callee(req, res, next) {
  var reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Review.find());

        case 2:
          reviews = _context.sent;
          res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: {
              reviews: reviews
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getReview = catchAsync(function _callee2(req, res, next) {
  var review;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Review.findById(req.params.id));

        case 2:
          review = _context2.sent;

          if (review) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('There is no review with that id')));

        case 5:
          res.status(200).json({
            status: 'success',
            data: {
              review: review
            }
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createReview = catchAsync(function _callee3(req, res, next) {
  var newReview;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Allow nested routes
          if (!req.body.tour) req.body.tour = req.params.tourId;
          if (!req.body.user) req.body.user = req.user.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Review.create(req.body));

        case 4:
          newReview = _context3.sent;
          res.status(201).json({
            status: 'success',
            data: {
              newReview: newReview
            }
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});