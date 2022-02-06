"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    protect = _require.protect,
    restrictTo = _require.restrictTo;

var _require2 = require('../controllers/reviewController'),
    getReview = _require2.getReview,
    getAllReviews = _require2.getAllReviews,
    createReview = _require2.createReview;

var router = express.Router({
  mergeParams: true
});
router.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);
router.route('/:id').get(getReview);
module.exports = router;