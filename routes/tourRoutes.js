const express = require('express');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  validID,
  checkBody,
} = require('../controllers/tourControllers');

const router = express.Router();

router.param('id', validID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = {
  router,
};
