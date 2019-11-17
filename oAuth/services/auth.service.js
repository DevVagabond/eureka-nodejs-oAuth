'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname + '/../.pem/public.pem'), 'utf8');
const privateKey = fs.readFileSync(path.resolve(__dirname + '/../.pem/private.pem'), 'utf8');


const generateToken = config => new Promise((resolve, reject) => {
  console.log("generate token", config);
  let tokenObj = { role: 'user', email: config.email, accessToken: config.accessToken }
  let jwtData = {};
  let now = new Date().getTime();
  let accessTokenExp = now + Number(process.env.TOKEN_EXP_MILLISEC);
  jwtData.exp = accessTokenExp;
  jwtData.data = tokenObj;
  jwt.sign(jwtData, privateKey, {
    algorithm: process.env.JWT_ALGORITHM
  }, function (err, token) {
    if (err) {
      reject(err)
    } else {
      resolve(token)
    }
  });
});




module.exports = {
  generateToken
}