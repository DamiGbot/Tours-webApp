"use strict";

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var _require = require('./routes/tourRoutes'),
    tourRouter = _require.router;

var _require2 = require('./routes/userRoutes'),
    userRouter = _require2.router;

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var app = express(); // 1) GLOBAL MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json());
app.use(express["static"]("".concat(__dirname, "/public")));
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}); // 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', function (req, res, next) {
  var err = new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404);
  next(err);
}); // Error handling with Express

app.use(globalErrorHandler);
module.exports = {
  app: app
};