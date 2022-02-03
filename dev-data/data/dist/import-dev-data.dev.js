"use strict";

var fs = require('fs');

var path = require('path');

var dotenv = require('dotenv');

var mongoose = require('mongoose');

var _require = require('../../models/tourModel'),
    Tour = _require.Tour;

dotenv.config({
  path: '../../config/.env'
});
var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

var main = function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          }));

        case 3:
          console.log('DB connection successful');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

main();
var tours = JSON.parse(fs.readFileSync(path.resolve('tours.json'), 'utf-8'));

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tour.create(tours));

        case 3:
          console.log('Data successfully loaded!');
          process.exit();
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.deleteMany());

        case 3:
          console.log('Data successfully deleted!');
          process.exit();
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}