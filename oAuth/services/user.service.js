'use strict';

const models = require("../models");

const patchUser = userData => new Promise((resolve, reject) => {
  models.User.read({
    'email': userData.email
  })
    .then(user => {
      if (!user && userData && userData.email) {
        return models.User.create({
          name: userData.name,
          email: userData.email,
          userName: userData.login,
          avatarUrl: userData.avatar_url
        })
      } else {
        return user;
      }
    })
    .then(resolve)
    .catch(reject)
});

module.exports = {
  patchUser
}