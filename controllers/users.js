const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const ValidationError = require('../utils/errors/ValidationError');
const CastError = require('../utils/errors/CastError');

async function findByEmail(e) {
  const isExist = await User.findOne({ email: e.email })
    .then((user) => user);
  return isExist;
}

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
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  findByEmail({ email })
    .then((isExist) => {
      if (!isExist) {
        bcrypt.hash(req.body.password, 10)
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
      } else {
        const validationError = new ValidationError();
        next(validationError);
      }
    })
    .catch(next);
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
