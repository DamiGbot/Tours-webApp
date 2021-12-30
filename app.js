const express = require('express');
const morgan = require('morgan');

const { router: tourRouter } = require('./routes/tourRoutes');
const { router: userRouter } = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('This is the middleware👋');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = {
  app,
};
