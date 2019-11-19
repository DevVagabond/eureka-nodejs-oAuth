'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../../controller')
const Auth = require("../../middlewares/auth");

/* API list*/
router.all('*', Auth.authenticateKey);
router.all('/secure*', Auth.verifyToken);

router.post('/secure/add', Auth.validateCarData, controller.car.add);
router.post('/secure/add-availablity/:id', Auth.checkAvailableDateEntry, controller.car.addAvailability);

router.get('/secure/all', controller.car.fetchAllCars);
router.get('/secure/list', controller.car.listCars);
router.get('/secure/check-time/:id', Auth.validateCarId, controller.car.checkSchedule);

router.put('/secure/edit-time/:id', Auth.validateSchedule, controller.car.updateTimelime);
router.put('/secure/edit/:id', Auth.validateCarOwner, controller.car.updateCar);

module.exports = router;
