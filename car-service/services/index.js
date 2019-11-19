'use strict';

const crypto = require('./salted-password');
const auth = require('./auth.service');




module.exports = {
  crypto,
  auth
}