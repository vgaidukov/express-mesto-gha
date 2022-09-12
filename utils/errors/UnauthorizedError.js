class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
    this.message = 'Неправильные почта или пароль';
  }
}

module.exports = UnauthorizedError;
