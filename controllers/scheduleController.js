const Schedule = require('../models/schedule');
const Vehicle = require('../models/vehicle');

class ScheduleController {

    static readAll(req,res,next) {
        Schedule.find({})
            .then(function(schedules) {
                res.status(200).json(schedules)
            })
            .catch(next);
    };

    static companySchedule(req,res,next) {
        let company = req.decoded.id;
        Schedule.find({company}).populate('vehicle')
            .then(function(schedules) {
                res.status(200).json(schedules)
            })
            .catch(next);
    };

    static create(req,res,next) {
        console.log('Masuk controller')
        let company = req.decoded.id;
        let vehicle = req.params.vehicle_id;
        let { driver_phone, 
            departure_date, driver_name, 
            departure_time, departure, destination, time_estimate, status,
            category,cost, capacity } = req.body;
        Schedule.create({
            company,
            vehicle,
            driver_phone,
            driver_name,
            departure_time,
            status,
            departure_date,
            departure,
            destination,
            time_estimate,
            status,
            cost,
            category,
            capacity
        })
        .then(function (schedule) {
            return Vehicle.updateOne({_id:vehicle}, {$push: {schedule: schedule}})
                .then(function () {
                    res.status(202).json({message: 'Schedule success created'});
                })
        })
        .catch(err => {
            console.log(err)
        });
    };

    static delete(req,res,next) {
        let schedule_id = req.params.schedule_id;
        Schedule.deleteOne({_id: schedule_id})
            .then(function() {
                res.status(201).json({message: 'Schedule success deleted'})
            })
            .catch(next);
    };

    static update(req,res,next) {
        let { vehicle_position, driver_phone, driver_name, time, status, departure_date } = req.body
        let schedule_id = req.params.schedule_id;
        Schedule.updateOne({_id: schedule_id},{
            vehicle_position, driver_phone, driver_name, time, status, departure_date
        }, {omitUndefined: true})
            .then(function () {
                res.status(201).json({message: 'Schedule success updated'})
            })
            .catch(next);
    };

    static updateScheduleStatus(req,res,next) {
        let schedule_id = req.params.schedule_id;
        console.log(schedule_id)
        let check = true;
        Schedule.findOne({_id: schedule_id})
            .then(function(schedule) {
                
                if (schedule.schedule_status == true) {
                    check = false;
                }else {
                    check = true;
                };
                return Schedule.updateOne({_id: schedule_id}, {schedule_status: check})
                    .then(function (schedule) {
                        let message;
                        if (check) {
                            message = 'Schedule Open'
                        }else {
                            message = 'Schedule Close'
                        }
                        res.status(201).json({message: message});
                    })
            })
            .catch(next);
    };

    

};


module.exports = ScheduleController;

