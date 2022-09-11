class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DefaultError';
    this.statusCode = 500;
  }
}

const defaultError = new DefaultError('На сервере произошла ошибка');

module.exports = { defaultError };
