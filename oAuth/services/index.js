'use strict';

const githubService = require("./github.service");
const auth = require("./auth.service");
const user = require("./user.service");

module.exports = {
  githubService,
  auth,
  user
}