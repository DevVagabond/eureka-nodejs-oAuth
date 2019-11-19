'use strict';
require('../db/mongo/schemas/car.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
    Car = mongoose.model('Car');


const create = (config = {}) => {
    return new Promise((resolve, reject) => {
        let newCar = new Car(config);
        console.log("inside car create---", config);
        newCar.save((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const read = (query, options = {}) => {
    return new Promise((resolve, reject) => {
        if (options.multi) {
            Car.find(query)
                .sort({
                    'createdAt': -1
                })
                .skip(options.skip || 0)
                .limit(options.limit || 0)
                .exec((err, Car) => err ? reject(err) : resolve(Car))
        } else {
            Car.findOne(query)
                .sort({
                    'createdAt': -1
                })
                .exec((err, Car) => err ? reject(err) : resolve(Car))
        }
    });
};
const update = (query, update, options = {}) => {
    options = _.extend(options, { upsert: false, runValidators: true });
    return new Promise((resolve, reject) => {
        Car.update(query, update, options)
            .exec((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const deleteCar = (query) => {
    return new Promise((resolve, reject) => {
        Car.remove(query, (err, Car) => err ? reject(err) : resolve(Car));
    });
};
const count = (query = {}) => {
    return new Promise((resolve, reject) => {
        Car.count(query, (err, count) => err ? reject(err) : resolve(count));
    })
};


module.exports = {
    create,
    read,
    update,
    deleteCar,
    count
};
