const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { errorHandler } = require('./utils/errorHandler');
const UnauthorizedError = require('./utils/errors/UnauthorizedError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((res, req, next) => {
  const err = new UnauthorizedError();
  next(err);
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
