const { validationError } = require('./errors/ValidationError');
const { castError } = require('./errors/CastError');
const { defaultError } = require('./errors/DefaultError');

const setErrorType = (err) => {
  if (err.name === 'ValidationError') {
    return validationError;
  }
  if (err.name === 'CastError') {
    return castError;
  }
  return defaultError;
};

module.exports = { setErrorType };
