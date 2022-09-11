const User = require('../models/user');
const { validationError } = require('../utils/errors/ValidationError');
const { castError } = require('../utils/errors/CastError');
const { defaultError } = require('../utils/errors/DefaultError');
const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const getUser = (req, res, next) => {
  if (!checkIdValidity(req.params.userId)) {
    next(validationError);
  }
  User.findById(
    req.params.userId,
    (err, card) => {
      if (card == null) {
        next(castError);
      }
      if (err) {
        next(defaultError);
      }
      res.send(card);
    },
  );
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  setUserInfo,
  setAvatar,
};
