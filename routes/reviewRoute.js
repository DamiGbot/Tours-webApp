const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getReview,
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router.route('/:id').get(getReview);

module.exports = router;
