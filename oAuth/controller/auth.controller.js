'use strict';

const debug = require('debug')('controller:auth');
const services = require("../services");

const redirectoAuth = (req, res, next) => {
  const requestToken = req.query.code;
  let userData;
  services.githubService.requestAccessToken(requestToken)
    .then(response => {
      let accessToken = response.access_token;
      return services.githubService.requestUserData(accessToken);
    })
    .then(data => {
      userData = data;
      return services.user.patchUser(userData);
    })
    .then(services.auth.generateToken)
    .then(data => {
      userData.accessToken = data;
      res.render('welcome', userData);
    })
    .catch(debug)
};

module.exports = {
  redirectoAuth
}