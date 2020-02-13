const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    vehicle_number : {
        type: String,
        required: [true, 'Vehicle number cannot be empty']
    },
    year: {
        type: String,
        required: [true, 'Vehicle year cannot be empty']
    },
    vehicle_type: {
        type: String,
        required: [true, 'Vehicle type cannot be empty']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    schedule: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule',
        }
    ]
});


const vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = vehicle;