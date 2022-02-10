"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    protect = _require.protect,
    restrictTo = _require.restrictTo;

var _require2 = require('../controllers/reviewController'),
    getReview = _require2.getReview,
    getAllReviews = _require2.getAllReviews,
    createReview = _require2.createReview,
    deleteReview = _require2.deleteReview,
    updateReview = _require2.updateReview,
    setTourUserIds = _require2.setTourUserIds;

var router = express.Router({
  mergeParams: true
});
router.route('/').get(getAllReviews).post(protect, restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').get(getReview)["delete"](deleteReview).patch(updateReview);
module.exports = router;