'use strict';
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {
        type: String
    },
    colour: {
        type: String
    },
    carNumber: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = mongoose.model('Car', CarSchema);