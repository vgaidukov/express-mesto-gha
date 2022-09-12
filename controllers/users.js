const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  if (!checkIdValidity(req.params.userId)) {
    throw new BadRequestError();
  }

  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new BadRequestError());
      }

      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const setUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }

      res.send(user);
    })
    .catch(next);
};

const setAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'very-secret-key',
        { expiresIn: '1w' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  setUserInfo,
  getUserInfo,
  setAvatar,
  login,
};
