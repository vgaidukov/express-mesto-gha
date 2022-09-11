const ValidationError = require('./errors/ValidationError');
const CastError = require('./errors/CastError');

const setErrorType = (err) => {
  if (err.name === 'ValidationError') {
    return new ValidationError();
  }
  if (err.name === 'CastError') {
    return new CastError();
  }
  return err;
};

module.exports = { setErrorType };
