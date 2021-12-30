const path = require('path');
const fs = require('fs');

const express = require('express');

const { writeFile } = require('./modules/writeFile');

const app = express();
const PORT = 8000;

//This middleware is very important in dealing with req body Content-type: application/json
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(path.resolve('dev-data', 'data', 'tours-simple.json'))
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get(`/api/v1/tours/:id`, (req, res) => {
  const id = +req.params.id;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  const tourIndex = tours.findIndex((items) => items.id === +req.params.id);
  const tour = tours[tourIndex];

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  writeFile(res, tours, newTour);
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((tour) => tour.id === id);
  const updatedTour = { ...tour, ...req.body };
  tours[id] = updatedTour;

  writeFile(res, tours, updatedTour);
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((tour) => tour.id === id);
  const updatedTour = { ...tour, ...req.body };
  tours[id] = updatedTour;

  writeFile(res, tours, updatedTour);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
