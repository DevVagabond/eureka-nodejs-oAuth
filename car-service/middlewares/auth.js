'use strict';

const services = require("../services");
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname + '/../.pem/public.pem'), 'utf8');
const jwt = require('jsonwebtoken');
const model = require('../models');
const joi = require('joi');
const mongoose = require("mongoose");

const dateSchema = {
  'dates': joi.array().items(joi.object().keys({
    'from': joi.object().keys({
      'year': joi.number().required(),
      'month': joi.number().required(),
      'day': joi.number().required(),
      'hour': joi.number().allow('').allow(null),
      'min': joi.number().allow('').allow(null),
    }),
    'to': joi.object().keys({
      'year': joi.number().required(),
      'month': joi.number().required(),
      'day': joi.number().required(),
      'hour': joi.number().allow('').allow(null),
      'min': joi.number().allow('').allow(null),
    })
  }))
}


const authenticateKey = (req, res, next) => {
  if (req.headers["x-api-key"] != process.env.API_KEY) {
    next({ err: "UNAUTHORIZED_TOKEN" })
  } else {
    next();
  }
};

const verifyToken = (req, res, next) => new Promise((resolve, reject) => {
  if (!req.headers['x-access-token']) {
    next({
      err: 'UNAUTHORIZED_TOKEN'
    });
  } else if (req.headers['x-access-token']) {
    jwt.verify(req.headers['x-access-token'], publicKey, (err, decoded) => {
      if (err) {
        next({
          err: "UNAUTHORIZED_TOKEN"
        });
      } else {
        services.auth.verifyUserToken(decoded)
          .then(info => {
            return model.User.read({
              'email': decoded.data.email
            })
          })
          .then(user => {
            req.user = JSON.parse(JSON.stringify(user));
            next();
          })
          .catch(next)
      }
    });
  } else {
    next({
      err: 'UNAUTHORIZED_TOKEN'
    });
  }
});

const validateCarData = (req, res, next) => {
  const schema = {
    brand: joi.string().required(),
    colour: joi.string().required(),
    carNumber: joi.string().required(),
  };

  joi.validate(req.body, schema, (err, valid) => {
    console.log(err)
    if (err) {
      next({ err: "UNAUTH_DATA" });
    } else {
      req.body.owner = req.user._id;
      req.body.carNumber = req.body.carNumber.toUpperCase();
      model.Car.read({
        'carNumber': req.body.carNumber
      })
        .then(car => {
          if (car) {
            next({ err: "CAR_EXISTS" })
          } else {
            next();
          }
        })
        .catch(next)
    }
  })
};

const checkAvailableDateEntry = (req, res, next) => {
  if (req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
    joi.validate(req.body, dateSchema, (err, valid) => {
      if (err) {
        next({ err: "UNAUTH_DATA" });
      } else {
        model.Availablity.read({
          'carId': req.params.id
        })
          .then(car => {
            if (car) {
              next({ err: "TIME_EXISTS" })
            } else {
              next();
            }
          })
      }
    })
  } else {
    next({ err: "UNAUTH_DATA" })
  }
};

const validateCarOwner = (req, res, next) => {
  if (!req.params.id) {
    next({ err: "UNAUTH_DATA" })
  } else {
    model.Car.read({
      '_id': req.params.id
    })
      .then(car => {
        if (!car) {
          next({ err: "NO_CAR_FOUND" })
        } else if (car.owner.toString() != req.user._id.toString()) {
          next({ err: "ACC_DENIED" })
        } else {
          next();
        }
      })
      .catch(next)
  }
};


const validateCarId = (req, res, next) => {
  if (!req.params.id) {
    next({ err: "UNAUTH_DATA" })
  } else {
    model.Car.read({
      '_id': req.params.id
    })
      .then(car => {
        if (!car) {
          next({ err: "NO_CAR_FOUND" })
        } else {
          return model.Availablity.read({
            'carId': req.params.id
          })
        }
      })
      .then(data => {
        if (!data) {
          next({ err: "NO_DATA_FOUND" })
        } else {
          next();
        }
      })
      .catch(next)
  }
};

const validateSchedule = (req, res, next) => {
  if (!req.params.id) {
    next({ err: "UNAUTH_DATA" })
  } else {
    model.Availablity.read({
      'carId': req.params.id
    })
      .then(data => {
        if (!data) {
          next({ err: "NO_DATA_FOUND" })
        } else {
          next();
        }
      })
      .catch(next)
  }
};


module.exports = {
  authenticateKey,
  verifyToken,
  validateCarData,
  checkAvailableDateEntry,
  validateCarOwner,
  validateCarId,
  validateSchedule
}