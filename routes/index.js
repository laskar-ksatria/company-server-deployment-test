const express = require('express');
const Router = express.Router();
const companyRouter = require('./companyRouter');
const vehicleRouter = require('./vehicleRouter');
const scheduleRouter = require('./scheduleRouter');
const passengerRouter = require('./passengerRouter');

Router.use('/company', companyRouter);
Router.use('/vehicle', vehicleRouter);
Router.use('/schedule', scheduleRouter);
Router.use('/passenger', passengerRouter);

module.exports = Router;