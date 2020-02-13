const mongoose = require('mongoose');
const { hashPass } = require('../helpers/index')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama Company tidak boleh kosong']
    },
    director_name: {
        type: String,
        required: [true, 'Director cannot be empty']
    },
    phone: {
        type: String,
        required: [true, 'Phone cannot be empty']
    },
    domicile: {
        type: String,
        required: [true, 'Domisili cannot be empty']
    },
    province: {
        type: String,
        required: [true, 'Provinsi cannot be emtpy']
    },
    address: {
        type: String,
        required: [true, 'Address cannot empty']
    },
    email: {
        type: String,
        validate: [{
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
            },
            message: props => `${props.value} is not valid email format`
        },
        {
            validator: function (value) {
                return this.model('Company').findOne({email: value})
                .then(function (email) {
                    if (email) {
                        return false
                    }else {
                        return true
                    }
                })
            },
            message: props => `${props.value} already taken, please take another one`
        }
    ],
        required: [true, 'Email Cannot be Empty']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at' }
})



companySchema.pre('save', function (next) {
    this.password = hashPass(this.password)
    next()
})


const company = mongoose.model('Company', companySchema)

module.exports = company;



