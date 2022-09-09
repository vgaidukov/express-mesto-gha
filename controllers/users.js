const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send({ data: users })
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user })
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const setUserInfo = (req, res) => {
  const { name, about } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const setAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  setUserInfo,
  setAvatar
};