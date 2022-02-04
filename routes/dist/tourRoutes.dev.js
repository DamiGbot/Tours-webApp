"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    protect = _require.protect,
    restrictTo = _require.restrictTo;

var _require2 = require('../controllers/reviewController'),
    createReview = _require2.createReview;

var _require3 = require('../controllers/tourControllers'),
    getAllTours = _require3.getAllTours,
    getTour = _require3.getTour,
    createTour = _require3.createTour,
    updateTour = _require3.updateTour,
    deleteTour = _require3.deleteTour,
    aliasTopTours = _require3.aliasTopTours,
    getTourStats = _require3.getTourStats,
    getBusyMonth = _require3.getBusyMonth;

var router = express.Router();
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getBusyMonth);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(protect, getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour)["delete"](protect, restrictTo('admin', 'lead-guide'), deleteTour);
router.route('/:tourId/reviews').post(protect, restrictTo('user'), createReview);
module.exports = {
  router: router
};