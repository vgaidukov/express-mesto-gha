const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const err = new Error();
        err.name = 'CastError';
        return Promise.reject(err);
      }
      res.send(user)
    })
    .catch(err => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      next(err);
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
      next(err);
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
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  setUserInfo,
  setAvatar
};