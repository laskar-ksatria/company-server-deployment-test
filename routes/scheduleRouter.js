const express = require('express');
const Router = express.Router();
const { authentification } = require('../middlewares/checkToken');
const { scheduleAuthorization } = require('../middlewares/authorization');
const scheduleController = require('../controllers/scheduleController');

Router.get('/', scheduleController.readAll);
Router.get('/schedule-company', authentification, scheduleController.companySchedule);
Router.post('/:vehicle_id', authentification, scheduleController.create);
Router.delete('/:schedule_id', authentification, scheduleAuthorization, scheduleController.delete);
Router.put('/:schedule_id', authentification, scheduleAuthorization, scheduleController.update);
Router.patch('/:schedule_id', authentification, scheduleAuthorization, scheduleController.updateScheduleStatus);


module.exports = Router;