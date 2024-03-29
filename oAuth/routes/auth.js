'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.get('/login', function (req, res, next) {
  res.render('index');
});

router.get('/redirect', controller.authController.redirectoAuth);
router.post('/verify', controller.authController.verifyUser);



module.exports = router;
