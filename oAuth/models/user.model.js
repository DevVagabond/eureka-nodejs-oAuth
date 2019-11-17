'use strict';
require('../db/mongo/schemas/user.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
  User = mongoose.model('User');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newUser = new User(config);
    newUser.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  return new Promise((resolve, reject) => {
    if (options.multi) {
      User.find(query)
        .sort({
          'createdAt': -1
        })
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .select("-password")
        .exec((err, User) => err ? reject(err) : resolve(User))
    } else {
      User.findOne(query)
        .sort({
          'createdAt': -1
        })
        .exec((err, User) => err ? reject(err) : resolve(User))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    User.update(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteUser = (query) => {
  return new Promise((resolve, reject) => {
    User.remove(query, (err, User) => err ? reject(err) : resolve(User));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    User.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};


module.exports = {
  create,
  read,
  update,
  deleteUser,
  count
};
