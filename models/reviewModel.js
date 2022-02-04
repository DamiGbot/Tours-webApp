const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'The review cannot be empty'],
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: {
        value: true,
        message: 'Review must belong to a tour.',
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: {
        value: true,
        message: 'Review must belong to a user.',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  //   this.select('-__v')
  //     .populate({
  //       path: 'tour',
  //       select: 'name',
  //     })
  //     .populate({
  //       path: 'user',
  //       select: 'name photo',
  //     });

  this.select('-__v').populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
