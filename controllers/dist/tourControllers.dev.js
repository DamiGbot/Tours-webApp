"use strict";

var _require = require('../models/tourModel'),
    Tour = _require.Tour; // const AppError = require('../utils/appError');


var catchAsync = require('../utils/catchAsync');

var _require2 = require('./handleFactory'),
    deleteOne = _require2.deleteOne,
    updateOne = _require2.updateOne,
    createOne = _require2.createOne,
    getOne = _require2.getOne,
    getAll = _require2.getAll; // Aliasing


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

var getTourStats = catchAsync(function _callee(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
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
          stats = _context2.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getBusyMonth = catchAsync(function _callee2(req, res, next) {
  var year, plan;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          year = +req.params.year;
          _context3.next = 3;
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
          plan = _context3.sent;
          res.status(200).json({
            status: 'success',
            result: plan.length,
            data: {
              plan: plan
            }
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var getAllTours = getAll(Tour);
var getTour = getOne(Tour, {
  path: 'reviews'
});
var createTour = createOne(Tour);
var updateTour = updateOne(Tour);
var deleteTour = deleteOne(Tour);
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