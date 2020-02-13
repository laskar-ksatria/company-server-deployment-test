const mongoose = require('mongoose');

const passengerSchema = ({
    name: {
        type: String,
        required: [true, 'Name cannot be empty']
    },
    booking_code: {
        type: String,
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});


const passenger = mongoose.model('Passenger', passengerSchema);

module.exports = passenger;