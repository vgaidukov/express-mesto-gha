const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res) => {
  // const { authorization } = req.headers;

  if (!req.cookies.jwt) {
    throw new UnauthorizedError();
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'very-secret-key');
  } catch (err) {
    throw new UnauthorizedError();
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  res.send({ message: 'Success' });
  // next(); // пропускаем запрос дальше
};

module.exports = auth;
