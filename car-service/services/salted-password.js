'use strict';

const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname + '/../.pem/public.pem'), 'utf8');
const privateKey = fs.readFileSync(path.resolve(__dirname + '/../.pem/private.pem'), 'utf8');
var rs = require('jsrsasign');


const md5 = string => crypto.createHash('md5').update(string).digest("hex")


/**
 * function to generate checksum with SHA1withRSA
 * @param {String} data 
 */
const createChecksum = config => {
  var checksumString;
  try {
    if (typeof config === 'object') {
      let keys = Object.keys(config).sort((a, b) => a > b ? 1 : -1);
      console.log("---", config, keys.join("|"));
      let values = keys.map(key => config[key].toString());
      console.log(values);
      checksumString = values.join("|");
    } else {
      checksumString = config;
    }
    console.log(checksumString);
    var sig = new rs.Signature({ alg: 'SHA1withRSA' });
    sig.init(privateKey);
    sig.updateString(checksumString);
    var sigVal = sig.sign();
    return sigVal.toUpperCase()
  } catch ($e) {
    console.log($e)
  }
}

const verifyChecksum = config => {
  var pubPEM = publicKey;
  var pub = rs.KEYUTIL.getKey(pubPEM);
  const sig = new rs.KJUR.crypto.Signature({ alg: 'SHA1withRSA' });
  sig.init(pub);
  sig.updateString(config.data);
  console.log("->>>>>>>>>>>>>>>  verifying checksum  ", config.data, config.signature)
  return sig.verify(config.signature);
};


module.exports = {
  createChecksum,
  verifyChecksum,
  md5
};
