const User = require('../models/user');
const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const ValidationError = require('../utils/errors/ValidationError');
const CastError = require('../utils/errors/CastError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  if (!checkIdValidity(req.params.userId)) {
    throw new ValidationError();
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new CastError();
      }
      res.send(user);
    })
    .catch(next);
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
