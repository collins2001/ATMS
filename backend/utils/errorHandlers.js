class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

exports.AppError = AppError;

exports.errorHandler = (err) => {
  if (err instanceof AppError) {
    return err;
  }

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return new AppError(err.message, 400);
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return new AppError('Invalid token. Please log in again.', 401);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    return new AppError('Your token has expired. Please log in again.', 401);
  }

  // Default to 500 server error
  return new AppError('Something went wrong!', 500);
}; 