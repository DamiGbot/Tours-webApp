const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down.....');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config/.env' });

const { app } = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const main = async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log('DB connection successful');
};

main();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handling Unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 Shutting down.....');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
