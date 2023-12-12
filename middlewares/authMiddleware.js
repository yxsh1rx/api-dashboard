const ErrorHandler = require('../errors/ErrorHandler');
const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ErrorHandler.badRequest('MISSING_AUTH_HEADER'));
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ErrorHandler.badRequest('MISSING_ACCESS_TOKEN'));
    }
    const userData = tokenService.validateAccess(accessToken);
    if (!userData) {
      return next(ErrorHandler.unauthorized());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ErrorHandler.badRequest('AUTHORIZATION_ERROR'));
  }
};
