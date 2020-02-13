const express = require('express');
const Router = express.Router();
const passengerController = require('../controllers/PassengerController');
const { authentification } = require('../middlewares/checkToken');

Router.get('/test',passengerController.readPassenger);

Router.get('/', authentification, passengerController.readCompanyPassenger);
Router.post('/:schedule_id', authentification, passengerController.create);
Router.delete('/:passenger_id', authentification, passengerController.delete);

module.exports = Router;