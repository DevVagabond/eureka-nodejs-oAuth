'use strict';

var responseHandler = require('../../middlewares/responseHandler');
const car = require('./car.route');
const errorHandler = require('../../middlewares/errorHandler')



module.exports = app => {

  /* API list*/

  app.use('/api/v1/car', car, responseHandler);

  /**
   * Always keep this route at last
   */
  app.use('*', function (req, res, next) {
    console.log("NO MATCH")
    next({
      err: 'NO_API_FOUND'
    });
  });
  app.use(errorHandler)

  return app;
}