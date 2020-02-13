const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    departure_date: {
        type: String,
        required: [true, 'Date cannot be empty']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    driver_phone: {
        type: String,
        required: [true, 'Phone driver cannot be empty']
    },
    driver_name: {
        type: String,
        required: [true, 'Driver name cannot be empty']
    },
    departure_time: {
        type: String,
        required: [true, 'Time cannot be empty']
    },
    destination: {
        type: String,
        required: [true, 'Destination cannot be empty']
    },
    category: {
        type: String,
        required: [true, 'Category cannot be empty']
    },
    cost: {
        type: String,
        required: [true, 'Cost cannot be empty']
    },
    departure: {
        type: String,
        required: [true, 'Departure cannot be empty']
    },
    time_estimate: {
        type: String,
        required: [true, 'Time estimate cannot be empty']
    },
    status: {
        type: String,
    },
    schedule_status: {
        type: Boolean,
        default: true
    },
    passenger: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }],
    capacity: {
        type: Number,
        required: [true, 'Capacity cannot be empty']
    },
    schedule_id: {
        type: String
    }
    
})


const schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = schedule;