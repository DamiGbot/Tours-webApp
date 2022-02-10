"use strict";

var Review = require('../models/reviewModel'); // const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');


var _require = require('./handleFactory'),
    deleteOne = _require.deleteOne,
    updateOne = _require.updateOne,
    createOne = _require.createOne,
    getOne = _require.getOne,
    getAll = _require.getAll;

exports.setTourUserIds = function (req, res, next) {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);