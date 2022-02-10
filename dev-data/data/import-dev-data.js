const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { Tour } = require('../../models/tourModel');
const { User } = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: '../../config/.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const main = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('DB connection successful');
  } catch (err) {
    console.log(err.message);
  }
};

main();

const reviews = JSON.parse(
  fs.readFileSync(path.resolve('reviews.json'), 'utf-8')
);
const tours = JSON.parse(fs.readFileSync(path.resolve('tours.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(path.resolve('users.json'), 'utf-8'));

const importData = async () => {
  try {
    await Review.create(reviews);
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Review.deleteMany();
    await Tour.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
