const express = require('express');
const Router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { tokenChecking, authentification } = require('../middlewares/checkToken');


Router.get('/allVehicles', vehicleController.readAll);
Router.get('/', authentification,vehicleController.readVehicleCompany);
Router.post('/', authentification,vehicleController.create);
Router.delete('/:vehicle_id', authentification,tokenChecking,vehicleController.delete);

module.exports = Router;