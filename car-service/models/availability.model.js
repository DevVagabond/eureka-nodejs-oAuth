'use strict';
require('../db/mongo/schemas/availability.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
    Availablity = mongoose.model('Availablity');


const create = (config = {}) => {
    return new Promise((resolve, reject) => {
        let newAvailablity = new Availablity(config);
        newAvailablity.save((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const read = (query, options = {}) => {
    return new Promise((resolve, reject) => {
        if (options.multi) {
            Availablity.find(query)
                .sort({
                    'createdAt': -1
                })
                .skip(options.skip || 0)
                .limit(options.limit || 0)
                .populate("carId")
                .exec((err, Availablity) => err ? reject(err) : resolve(Availablity))
        } else {
            Availablity.findOne(query)
                .sort({
                    'createdAt': -1
                })
                .exec((err, Availablity) => err ? reject(err) : resolve(Availablity))
        }
    });
};
const update = (query, update, options = {}) => {
    options = _.extend(options, { upsert: false, runValidators: true });
    return new Promise((resolve, reject) => {
        Availablity.update(query, update, options)
            .exec((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const deleteAvailablity = (query) => {
    return new Promise((resolve, reject) => {
        Availablity.remove(query, (err, Availablity) => err ? reject(err) : resolve(Availablity));
    });
};
const count = (query = {}) => {
    return new Promise((resolve, reject) => {
        Availablity.count(query, (err, count) => err ? reject(err) : resolve(count));
    })
};
const aggregate = (pipeline = []) => {
    return new Promise((resolve, reject) => {
        Availablity.aggregate(pipeline, (err, count) => err ? reject(err) : resolve(count));
    })
};



module.exports = {
    create,
    read,
    update,
    deleteAvailablity,
    count,
    aggregate
};
