'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  userName: {
    type: String
  },
  avatarUrl: {
    type: String
  }
}, {
    versionKey: false,
    timestamps: true
  });


module.exports = mongoose.model('User', UserSchema);