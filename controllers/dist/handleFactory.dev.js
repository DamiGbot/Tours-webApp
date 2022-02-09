"use strict";

var catchAsync = require('../utils/catchAsync');

var AppError = require('../utils/appError');

exports.deleteOne = function (Model) {
  return catchAsync(function _callee(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Model.findByIdAndDelete(req.params.id));

          case 2:
            doc = _context.sent;

            if (doc) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", next(new AppError('No document found with that ID', 404)));

          case 5:
            res.status(204).json({
              status: 'success',
              data: null
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};