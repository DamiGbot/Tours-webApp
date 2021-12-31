const fs = require('fs');
const path = require('path');

const { writeFile } = require('../modules/writeFile');

const tours = JSON.parse(
  fs.readFileSync(path.resolve('dev-data', 'data', 'tours-simple.json'))
);

const validID = (req, res, next, val) => {
  console.log(`The id is ${val}`);

  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  next();
};

const checkBody = (req, res, next) => {
  console.log('This is from the checkBody middleware🤙');

  const enteredBodyIsValid = req.body.name && req.body.price;
  if (!enteredBodyIsValid) {
    return res.status(400).json({
      status: 'error',
      message: 'The new tour must have a name and price',
    });
  }

  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tourIndex = tours.findIndex((items) => items.id === +req.params.id);
  const tour = tours[tourIndex];

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  writeFile(res, tours, newTour);
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((list) => list.id === id);
  const updatedTour = { ...tour, ...req.body };
  tours[id] = updatedTour;

  writeFile(res, tours, updatedTour);
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const updatedTours = tours.filter((tour) => tour.id !== id);

  writeFile(res, updatedTours);
};

module.exports = {
  validID,
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
