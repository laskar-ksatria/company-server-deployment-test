const Vehicle = require('../models/vehicle');

class VehicleController {

    static readAll(req,res,next) {
        Vehicle.find({})
            .then(function(vehicles) {
                res.status(200).json(vehicles);
            })
            .catch(next);
    };

    static readVehicleCompany(req,res,next) {
        let company = req.decoded.id;
        Vehicle.find({company})
            .then(function(vehicles) {
                res.status(200).json(vehicles);
            })
            .catch(next)
    };

    static create(req,res,next) {

        console.log('Masuk controller')
        let company = req.decoded.id;
        let { image, vehicle_number, year, vehicle_type } = req.body;
        
        image = 'https://content.icarcdn.com/styles/article_cover/s3/field/article/cover/2019/toyota-avanza-tahun-2019-bekas-mulai-dijual-ini-kisaran-harganya-123.jpg?itok=-N5ox4JH'

        Vehicle.create({
            image,
            vehicle_number,
            vehicle_type,
            year,
            company
        })
        .then(function (vehicle) {
            res.status(202).json({message: 'Vehicle success added'})
        })
        .catch(next);

    };

    static delete(req,res,next) {
        let vehicleId = req.params.vehicle_id;
        Vehicle.deleteOne({_id: vehicleId})
            .then(function (vehicle) {
                res.status(201).json({message: 'Vehicle has successfully delete'})
            })
            .catch(next);
    };



};

module.exports = VehicleController;