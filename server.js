const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config/.env' });

const { app } = require('./app');

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
  } catch (e) {
    console.log(e.message);
  }
};

main();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
