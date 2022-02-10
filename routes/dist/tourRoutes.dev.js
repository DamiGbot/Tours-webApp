"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    protect = _require.protect,
    restrictTo = _require.restrictTo;

var reviewRouter = require('../routes/reviewRoute');

var _require2 = require('../controllers/tourControllers'),
    getAllTours = _require2.getAllTours,
    getTour = _require2.getTour,
    createTour = _require2.createTour,
    updateTour = _require2.updateTour,
    deleteTour = _require2.deleteTour,
    aliasTopTours = _require2.aliasTopTours,
    getTourStats = _require2.getTourStats,
    getBusyMonth = _require2.getBusyMonth;

var router = express.Router();
router.use('/:tourId/reviews', reviewRouter);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide'), getBusyMonth);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour);
router.route('/:id').get(getTour).patch(protect, restrictTo('admin', 'lead-guide'), updateTour)["delete"](protect, restrictTo('admin', 'lead-guide'), deleteTour);
module.exports = {
  router: router
};