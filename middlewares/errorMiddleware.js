// const ErrorHandler = require('../errors/errorHandler');

module.exports = function (err, req, res, next) {
  // if (err instanceof ErrorHandler) {
  //   return res.status(err.status).json({
  //     status: err.status,
  //     message: err.message
  //   });
  // }
  // return res.status(500).json({
  //   message: err.message,
  //   type: 'NOT_HANDLED'
  // });
  return res.status(err.status).json({
    status: err.status,
    message: err.message
  });
};
