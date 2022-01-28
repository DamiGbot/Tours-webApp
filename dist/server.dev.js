"use strict";

var dotenv = require('dotenv');

var mongoose = require('mongoose');

process.on('uncaughtException', function (err) {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down.....');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({
  path: './config/.env'
});

var _require = require('./app'),
    app = _require.app;

var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

var main = function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          }));

        case 2:
          console.log('DB connection successful');

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

main();
var PORT = process.env.PORT || 8000;
var server = app.listen(PORT, function () {
  console.log("App running on port ".concat(PORT));
}); // Handling Unhandled Rejection

process.on('unhandledRejection', function (err) {
  console.log('UNHANDLED REJECTION 💥 Shutting down.....');
  console.log(err.name, err.message);
  server.close(function () {
    process.exit(1);
  });
});