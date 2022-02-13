const mongoose = require('mongoose');
const { Tour } = require('./tourModel');

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

reviewSchema.statics.calcAverageRatings = async function (tourID) {
  const stats = await this.aggregate([
    { $match: { tour: tourID } },
    {
      $group: {
        _id: '$tour',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourID, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].numRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourID, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRatings(this.review.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
