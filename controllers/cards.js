const Card = require('../models/card');
const { validationError } = require('../utils/errors/ValidationError');
const { castError } = require('../utils/errors/CastError');
const { defaultError } = require('../utils/errors/DefaultError');
const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  const { name, link, owner } = req.body;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(setErrorType(err));
    });
};

const deleteCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    next(validationError);
  }
  Card.findByIdAndRemove(
    req.params.cardId,
    (err, card) => {
      if (card === null) {
        next(castError);
      }
      if (err) {
        next(defaultError);
      }
      res.send(card);
    },
  );
};

const likeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    next(validationError);
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
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

const dislikeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    next(validationError);
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
