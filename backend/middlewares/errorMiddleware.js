const { errorHandler } = require('../utils/errorHandlers');

exports.handleError = (err, req, res, next) => {
  const error = errorHandler(err);
  res.status(error.status || 500).json({
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}; 