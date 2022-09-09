const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      res.send({ data: cards })
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({
    name,
    link,
    owner,
    likes,
    createdAt
  })
    .then((card) => {
      res.send(card);
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card })
    })
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard
};