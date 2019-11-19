'use strict';

var module, exports;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db;
/*****************************************
 *    CONNECTING MONGODB USING MONGOOSE  *
 *****************************************/
var connect = function (address, options) {
  mongoose.Promise = global.Promise;
  db = mongoose.connect(address, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return new Promise(function (resolve, reject) {
    mongoose.connection.once('open', function () {
      require('./schemas');
      console.log("Database Connected : ", mongoose.connection.port);
      resolve();
    });
    mongoose.connection.on('error', function (err) {
      if (err) {
        throw new Error('Database Connection Error ', err);
        reject();
      }
    });
  });
};
module.exports.connect = connect;
/**************************************
 *  RETURNS MONGOOSE INSTANCE         *
 **************************************/
module.exports.dbInstance = function () {
  if (mongoose.connection.readyState !== 1) {
    return null;
  } else {
    return db;
  }
};