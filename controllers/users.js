const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      console.log({ data: users });
      res.send({ data: users })
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const getUser = (req, res) => {
  console.log(req.params);
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

module.exports = {
  getUsers,
  getUser,
  createUser
};