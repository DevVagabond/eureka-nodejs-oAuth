'use strict'


module.exports = (err, req, res, next) => {
  console.log(err);

  const lang = require('../langs')[req.query.lang || 'en-us'];

  let message = lang["errors"][err.message || err.err || err.title] || "message missing";

  res.status(401).send({
    "err": message || err.message || err.err || err.title || "message missing",
    "success": false
  })
}