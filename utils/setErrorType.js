const BadRequestError = require('./errors/BadRequestError');
const NotFoundError = require('./errors/NotFoundError');
const UnauthorizedError = require('./errors/UnauthorizedError');

const setErrorType = (err) => {
  if (err.name === 'ValidationError') {
    return new BadRequestError();
  }
  if (err.name === 'CastError') {
    return new NotFoundError();
  }
  if (err.name === 'UnauthorizedError') {
    return new UnauthorizedError();
  }
  return err;
};

module.exports = { setErrorType };
