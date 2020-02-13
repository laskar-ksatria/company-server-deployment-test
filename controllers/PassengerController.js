const Passenger = require('../models/passenger');
const Schedule = require('../models/schedule');

class PassengerController {

    static readPassenger(req,res,next) {
        Passenger.find({})
            .then(function(passenger) {
                res.status(200).json(passenger)
            })
            .catch(next);
    }

    static readCompanyPassenger(req,res,next) {
        let company = req.decoded.id;
        Passenger.find({company: company}).populate('schedule')
            .then(function(passengers) {
                res.status(200).json(passengers)
            })
            .catch(next);
    };

    static create(req,res,next) {
        let company = req.decoded.id;
        let schedule_id = req.params.schedule_id;
        console.log(schedule_id);
        let { name } = req.body
        let booking_code = Date.now();
        console.log(booking_code)
        let latest = 0;
        Schedule.findOne({_id: schedule_id})
            .then(function (schedule) {
                latest = schedule.capacity;
                console.log(latest)
                if (schedule.capacity == 0) {
                    return Schedule.updateOne({_id: schedule_id},{schedule_status: false})
                        .then(function() {

                            next({message: 'No more seat'});
                        })
                }else {
                    return Passenger.create({
                        name,
                        booking_code,
                        schedule,
                        company
                    })
                    .then(function(passenger) {
                        return Schedule.findOne({_id: schedule_id})
                            .then(function (schedule) {
                                latest = latest - 1;
                                console.log(latest)

                                let cap = Number(latest);
                                console.log(cap)
                                return Schedule.updateOne({_id: schedule_id}, {capacity: cap})
                                    .then(function () {
                                        res.status(202).json({message: `Passenger ${name} success added`})
                                    })
                            })
                        
                    })
                }
            })
            .catch(next);
    };

    static delete(req,res,next) {
        let passenger_id = req.params.passenger_id;
        Passenger.deleteOne({_id: passenger_id})
            .then(function () {
                res.status(201).json({message: `Passenger success remove`})
            })
            .catch(next);
    };

    

};


module.exports = PassengerController;