"use strict";

var mongoose = require('mongoose');

var _require = require('./tourModel'),
    Tour = _require.Tour;

var reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'The review cannot be empty']
  },
  rating: {
    type: Number,
    max: 5,
    min: 1
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: {
      value: true,
      message: 'Review must belong to a tour.'
    }
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: {
      value: true,
      message: 'Review must belong to a user.'
    }
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
reviewSchema.index({
  tour: 1,
  user: 1
}, {
  unique: true
});
reviewSchema.pre(/^find/, function (next) {
  //   this.select('-__v')
  //     .populate({
  //       path: 'tour',
  //       select: 'name',
  //     })
  //     .populate({
  //       path: 'user',
  //       select: 'name photo',
  //     });
  this.select('-__v').populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = function _callee(tourID) {
  var stats;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.aggregate([{
            $match: {
              tour: tourID
            }
          }, {
            $group: {
              _id: '$tour',
              numRating: {
                $sum: 1
              },
              avgRating: {
                $avg: '$rating'
              }
            }
          }]));

        case 2:
          stats = _context.sent;

          if (!(stats.length > 0)) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Tour.findByIdAndUpdate(tourID, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].numRating
          }));

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(Tour.findByIdAndUpdate(tourID, {
            ratingsAverage: 4.5,
            ratingsQuantity: 0
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});
reviewSchema.pre(/^findOneAnd/, function _callee2(next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.findOne());

        case 2:
          this.review = _context2.sent;
          next();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
reviewSchema.post(/^findOneAnd/, function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(this.review.constructor.calcAverageRatings(this.review.tour));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;