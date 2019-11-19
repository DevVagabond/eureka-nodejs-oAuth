'use strict';

const request = require("request");
const helper = require("../helper");

const verifyUserToken = config => new Promise((resolve, reject) => {
    request({
        'url': `${process.env.AUTH_URL}${helper.URL.authUrl}`,
        'method': 'POST',
        'body': config,
        'json': true
    }, (err, res, body) => {
        if (err) {
            reject(err);
        } else {
            body = typeof body === 'string' ? JSON.parse(body) : body
            resolve(body);
        }
    })
});

module.exports = {
    verifyUserToken
}