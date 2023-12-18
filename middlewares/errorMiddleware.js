module.exports = function (err, req, res, next) {
  if (err.status !== undefined) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      type: 'HANDLED'
    });
  } else
    return res.status(500).json({
      status: 500,
      message: err.message,
      type: 'NOT_HANDLED'
    });
};
