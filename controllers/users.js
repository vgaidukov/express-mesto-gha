const User = require("../models/user");
const { validationError, castError, defaultError } = require('../utils/errors.js');
const { checkIdValidity } = require('../utils/checkIdValidity.js');
const { setErrorType } = require('../utils/setErrorType.js');

const getUsers = (req, res, next) => {
  User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      return next(setErrorType(err));
    });
};

const getUser = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    return next(validationError);
  }
  User.findById(
    req.params.userId,
    function (err, card) {
      if (card == null) {
        return next(castError);
      }
      if (err) {
        return next(defaultError);
      }
      res.send(card)
    }
  )
  // .then((user) => {
  //   if (!user) {
  //     const err = new Error();
  //     err.name = 'CastError';
  //     return Promise.reject(err);
  //   }
  //   res.send(user)
  // })
  // .catch(err => {
  //   next(err);
  // });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      return next(setErrorType(err));
    });
};

const setUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true
    })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      return next(setErrorType(err));
    });
};

const setAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true
    })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      return next(setErrorType(err));
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  setUserInfo,
  setAvatar
};