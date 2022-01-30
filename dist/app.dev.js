"use strict";

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var _require = require('./routes/tourRoutes'),
    tourRouter = _require.router;

var _require2 = require('./routes/userRoutes'),
    userRouter = _require2.router;

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var app = express(); // 1) GLOBAL MIDDLEWARE
// Set security HTTP headers

app.use(helmet({})); //Development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
})); // Data sanitization against noSQL query injection

app.use(mongoSanitize()); // Data sanitization against XSS

app.use(xss()); // Prevent parameter pollution

app.use(hpp({
  whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price']
})); // Serving static files

app.use(express["static"]("".concat(__dirname, "/public"))); // Test middleware

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