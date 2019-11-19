'use strict'

const model = require("../models");

const add = (req, res, next) => {
    model.Car.create(req.body)
        .then(data => {
            res.body = {
                'data': data,
                'message': 'SUCCESS'
            };
            next();
        })
        .catch(next)
};

const fetchAllCars = (req, res, next) => {
    model.Car.read({}, {
        multi: true,
        skip: req.query.skip || 0,
        limit: req.query.limit || 0,
    })
        .then(info => {
            res.body = {
                'data': info,
                'message': 'SUCCESS'
            };
            next()
        })
        .catch(next)
};
const addAvailability = (req, res, next) => {
    let availableDates = req.body.dates.map(date => {
        return {
            from: new Date(date.from.year, date.from.month, date.from.day, date.from.hour || 0, date.from.min || 0, 0, 0).toISOString(),
            to: new Date(date.to.year, date.to.month, date.to.day, date.to.hour || 0, date.to.min || 0, 0, 0).toISOString(),
        }
    });

    model.Availablity.create({
        'carId': req.params.id,
        'dates': availableDates
    })
        .then(info => {
            res.body = {
                data: info,
                message: "SUCCESS"
            };
            next();
        })
        .catch(next)
};

const listCars = (req, res, next) => {
    let query = {};
    if (req.query.from) {
        query["$and"] = [
            {
                "dates.from": {
                    $lte: req.query.from
                }
            },
            {
                "dates.to": {
                    $gte: req.query.from
                }
            }]
    }
    if (req.query.to) {
        query["$and"] = [
            {
                "dates.from": {
                    $lte: req.query.to
                }
            },
            {
                "dates.to": {
                    $gte: req.query.to
                }
            }]
    }
    model.Availablity.read(query, {
        multi: true,
        skip: req.query.skip || 0,
        limit: req.query.limit || 0,
    })
        .then(info => {
            res.body = {
                'data': info,
                'message': 'SUCCESS'
            };
            next();
        })
        .catch(next)
};


const checkSchedule = (req, res, next) => {
    let query = {
        'carId': req.params.id
    };
    if (req.query.from) {
        query["$and"] = [
            {
                "dates.from": {
                    $lte: req.query.from
                }
            },
            {
                "dates.to": {
                    $gte: req.query.from
                }
            }]
    }
    if (req.query.to) {
        query["$and"] = [
            {
                "dates.from": {
                    $lte: req.query.to
                }
            },
            {
                "dates.to": {
                    $gte: req.query.to
                }
            }]
    }
    model.Availablity.read(query)
        .then(info => {
            res.body = {
                'data': info,
                'message': 'SUCCESS'
            };
            next();
        })
        .catch(next)
};

const updateTimelime = (req, res, next) => {
    let availableDates = req.body.dates.map(date => {
        return {
            from: new Date(date.from.year, date.from.month, date.from.day, date.from.hour || 0, date.from.min || 0, 0, 0).toISOString(),
            to: new Date(date.to.year, date.to.month, date.to.day, date.to.hour || 0, date.to.min || 0, 0, 0).toISOString(),
        }
    });
    model.Availablity.update({
        '_id': req.params.id
    }, {
        $set: {
            dates: availableDates
        }
    })
        .then(info => {
            res.body = {
                'data': {},
                'message': 'SUCCESS_UPD'
            };
            next();
        })
        .catch(next)
};

const updateCar = (req, res, next) => {
    model.Car.update({
        '_id': req.params.id
    }, {
        $set: req.body
    })
        .then(info => {
            res.body = {
                'data': {},
                'message': 'SUCCESS_UPD'
            };
            next();
        })
        .catch(next)
};

module.exports = {
    listCars,
    add,
    fetchAllCars,
    addAvailability,
    checkSchedule,
    updateTimelime,
    updateCar
}