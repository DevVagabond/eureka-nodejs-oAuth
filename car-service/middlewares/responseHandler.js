'use strict';
var langs = require('../langs');
const helper = require('../helper');
module.exports = function (req, res, next) {
  if (res.body) {
    let response = {};
    response.data = res.body.data || {};
    response.errors = res.body.errors || [];
    response.success = Object.keys(response.errors).length ? false : true;
    if (response.success) {
      delete response.errors;
    }
    console.log(">>>>>>>>>>>>", res.body);
    var message = langs[req.query.lang || 'en-us'][response.success ? 'success' : 'errors'][res.body.message || 'CUSTOM_MESSAGE'];
    try {
      // response.message = helper.common.compileText(message.message, res.body.meta || {});
      response.message = message ? message.message : res.body.message;
      response.status = 200;
      res.status(response.status).send(response);
      response.success = true;
    } catch (err) {
      console.log(err);
      response.status = 401;
      res.status(response.status).send(response);
    }
  } else {
    let response = {};
    response.err = "UNAUTHORIZED";
    response.data = {};
    response.code = 401;
    res.status(401).send(response);
  }
}