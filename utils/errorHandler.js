const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST).send({ message: 'Ошибка валидации, переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

module.exports = { errorHandler };