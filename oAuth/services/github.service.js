'use strict';

const request = require("request");
const config = require("../config");

const requestAccessToken = code => new Promise((resolve, reject) => {
  request({
    'url': `${config.githubAccessToken}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: 'application/json'
    },
    method: 'POST'
  }, (err, res, body) => {
    if (err) {
      reject(err)
    } else {
      body = typeof body === 'string' ? JSON.parse(body) : body;
      resolve(body);
    }
  });
});

const requestUserData = accessToken => new Promise((resolve, reject) => {
  return request({
    url: config.githubUserUrl,
    headers: {
      Authorization: 'token ' + accessToken,
      'User-Agent': 'Login-App'
    },
    method: 'GET'
  }, (err, res, body) => {
    if (err) {
      reject(err);
    } else {
      body = typeof body === 'string' ? JSON.parse(body) : body;
      body.accessToken = accessToken;
      resolve(body);
    }
  });
});


module.exports = {
  requestAccessToken,
  requestUserData
}

