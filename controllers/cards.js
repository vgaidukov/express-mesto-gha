const Card = require("../models/card");

const getCards = (req, res, next) => {
  Card.find({})
    .then(cards => {
      res.send({ data: cards })
    })
    .catch(err => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  const { name, link, owner } = req.body;
  Card.create({
    name,
    link,
    owner
  })
    .then((card) => {
      res.send(card);
    })
    .catch(err => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card })
    })
    .catch(err => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send({ data: card })
    })
    .catch(err => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send({ data: card })
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};