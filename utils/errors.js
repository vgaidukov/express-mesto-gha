class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = "CastError";
    this.statusCode = 404;
  }
}

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = "DefaultError";
    this.statusCode = 500;
  }
}

const validationError = new ValidationError('Ошибка валидации, переданы некорректные данные');
const castError = new CastError('Карточка или пользователь не найден или был запрошен несуществующий роут');
const defaultError = new DefaultError('На сервере произошла ошибка');

module.exports = { validationError, castError, defaultError };