const { validationError, castError, defaultError } = require('../utils/errors.js')

const setErrorType = (err) => {
  if (err.name = 'ValidationError') {
    return validationError;
  } else if (err.name = 'CastError') {
    return castError;
  } else {
    return defaultError;

  }
}

module.exports = { setErrorType };