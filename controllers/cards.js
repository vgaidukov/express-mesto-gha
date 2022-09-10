const Card = require("../models/card");
const { validationError, castError, defaultError } = require('../utils/errors.js')
const { checkIdValidity } = require('../utils/checkIdValidity.js')
const { setErrorType } = require('../utils/setErrorType.js')

const getCards = (req, res, next) => {
  Card.find({})
    .then(cards => {
      res.send(cards)
    })
    .catch(err => {
      return next(setErrorType(err));
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
      return next(setErrorType(err));
    });
};

const deleteCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    return next(validationError);
  }
  Card.findByIdAndRemove(
    req.params.cardId,
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
};

const likeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    return next(validationError);
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
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
};

const dislikeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    return next(validationError);
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
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
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};