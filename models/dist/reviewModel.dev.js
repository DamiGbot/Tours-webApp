"use strict";

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'The review cannot be empty']
  },
  rating: {
    type: Number,
    max: 5,
    min: 1
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  tourReviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: {
      value: true,
      message: 'Review must belong to a tour.'
    }
  },
  user: {
    type: mongoose.SchemaType.ObjectId,
    ref: 'User',
    required: {
      value: true,
      message: 'Review must belong to a user.'
    }
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;