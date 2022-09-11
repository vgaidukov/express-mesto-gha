class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

const validationError = new ValidationError('Ошибка валидации, переданы некорректные данные');

module.exports = { validationError };
