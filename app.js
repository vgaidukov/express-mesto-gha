const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { urlPattern } = require('./utils/constants');

const { errorHandler } = require('./utils/errorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }).unknown(true),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlPattern),
    }).unknown(true),
  }),
  createUser,
);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((res, req, next) => {
  const err = new NotFoundError();
  next(err);
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
