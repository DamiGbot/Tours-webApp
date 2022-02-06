const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoute');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getBusyMonth,
} = require('../controllers/tourControllers');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getBusyMonth);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = {
  router,
};
