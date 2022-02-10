"use strict";

var _require = require('../models/tourModel'),
    Tour = _require.Tour;

var _require2 = require('../utils/apiFeatures'),
    APIFeatures = _require2.APIFeatures;

var AppError = require('../utils/appError');

var catchAsync = require('../utils/catchAsync');

var _require3 = require('./handleFactory'),
    deleteOne = _require3.deleteOne,
    updateOne = _require3.updateOne,
    createOne = _require3.createOne; // Aliasing


var aliasTopTours = function aliasTopTours(req, res, next) {
  return regeneratorRuntime.async(function aliasTopTours$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.query.limit = '5';
          req.query.sort = '-ratingsAverage,price';
          req.query.fields = 'name,duration,price,ratingsAverage,summary,difficulty';
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getAllTours = catchAsync(function _callee(req, res, next) {
  var features, tours;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
          _context2.next = 3;
          return regeneratorRuntime.awrap(features.query);

        case 3:
          tours = _context2.sent;
          res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
              tours: tours
            }
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getTour = catchAsync(function _callee2(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Tour.findById(req.params.id).populate({
            path: 'reviews'
          }));

        case 2:
          tour = _context3.sent;

          if (tour) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new AppError('No tour found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var createTour = createOne(Tour);
var updateTour = updateOne(Tour);
var deleteTour = deleteOne(Tour);
var getTourStats = catchAsync(function _callee3(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $match: {
              ratingsAverage: {
                $gte: 4.5
              }
            }
          }, {
            $group: {
              _id: {
                $toUpper: '$difficulty'
              },
              numTours: {
                $sum: 1
              },
              numRating: {
                $sum: '$ratingsQuantity'
              },
              avgRating: {
                $avg: '$ratingsAverage'
              },
              avgPrice: {
                $avg: '$price'
              },
              minPrice: {
                $min: '$price'
              },
              maxPrice: {
                $max: '$price'
              }
            }
          }, {
            $sort: {
              avgPrice: 1
            }
          } // { $match: { _id: { $ne: 'EASY' } } },
          ]));

        case 2:
          stats = _context4.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var getBusyMonth = catchAsync(function _callee4(req, res, next) {
  var year, plan;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          year = +req.params.year;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $unwind: '$startDates'
          }, {
            $match: {
              startDates: {
                $gte: new Date("".concat(year, "-01-01")),
                $lte: new Date("".concat(year, "-12-31"))
              }
            }
          }, {
            $group: {
              _id: {
                $month: '$startDates'
              },
              numTourStarts: {
                $sum: 1
              },
              tours: {
                $push: '$name'
              }
            }
          }, // This is used to group the result based on the _id
          {
            $sort: {
              numTourStarts: -1
            }
          }, // This is used to sort results in asc or desc
          {
            $addFields: {
              month: '$_id'
            }
          }, // This is used to add field to a document
          {
            $project: {
              _id: 0
            }
          }, // This is used to hide or show a stats, 0 to hide and 1 to show
          {
            $limit: 12
          } // limit the number of documents to 6
          ]));

        case 3:
          plan = _context5.sent;
          res.status(200).json({
            status: 'success',
            result: plan.length,
            data: {
              plan: plan
            }
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  getAllTours: getAllTours,
  getTour: getTour,
  createTour: createTour,
  updateTour: updateTour,
  deleteTour: deleteTour,
  aliasTopTours: aliasTopTours,
  getTourStats: getTourStats,
  getBusyMonth: getBusyMonth
};