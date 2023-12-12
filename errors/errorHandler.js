module.exports = class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ErrorHandler(400, message);
  }
  static forbidden(message) {
    return new ErrorHandler(403, message);
  }
  static unauthorized() {
    return new ErrorHandler(401, 'USER_NOT_AUTHORIZED');
  }
  static internal(message) {
    return new ErrorHandler(500, message);
  }

  static notFound() {
    return new ErrorHandler(404, 'PAGE_NOT_FOUND');
  }
};
