const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { Tour } = require('../../models/tourModel');

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

const tours = JSON.parse(
  fs.readFileSync(path.resolve('tours-simple.json'), 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
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
