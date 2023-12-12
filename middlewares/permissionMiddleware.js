const ErrorHandler = require('../errors/errorHandler');

const checkPermissions = (permissions) => {
  return (req, res, next) => {
    const role = req.headers.role;
    if (permissions.includes(role)) {
      next();
    } else {
      return next(ErrorHandler.forbidden('ADMIN_ONLY_OPERATION'));
    }
  };
};

module.exports = { checkPermissions };
