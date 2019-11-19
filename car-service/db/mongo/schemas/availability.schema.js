'use strict';
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    dates: [{
        from: {
            type: Date
        },
        to: {
            type: Date
        }
    }]
}, {
    versionKey: false,
    timestamps: true
});


module.exports = mongoose.model('Availablity', availabilitySchema);