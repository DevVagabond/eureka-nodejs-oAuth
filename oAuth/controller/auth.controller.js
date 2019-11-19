'use strict';

const debug = require('debug')('controller:auth');
const services = require("../services");

const redirectoAuth = (req, res, next) => {
  const requestToken = req.query.code;
  let userData;
  let accessToken;
  services.githubService.requestAccessToken(requestToken)
    .then(response => {
      accessToken = response.access_token;
      return services.githubService.requestUserData(accessToken);
    })
    .then(services.user.patchUser)
    .then(user => {
      userData = user;
      return services.auth.generateToken({
        'accessToken': accessToken,
        'email': user.email
      })
    })
    .then(data => {
      userData.accessToken = data;
      res.render('welcome', userData);
    })
    .catch(debug)
};


const verifyUser = (req, res, next) => {
  services.githubService.requestUserData(req.body.accessToken)
    .then(user => {
      if (user && user.email && user.email === req.body.email) {
        res.send({
          'success': true,
          'data': req.body
        })
      } else {
        res.status(401).send({
          'success': false,
          'err': 'UNAUTHORIZED'
        })
      }
    })
    .catch(err => {
      res.status(401).send({
        'success': false,
        'err': 'UNAUTHORIZED'
      })
    })
};

module.exports = {
  redirectoAuth,
  verifyUser
}