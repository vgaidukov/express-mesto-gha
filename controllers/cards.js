const Card = require('../models/card');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { checkIdValidity } = require('../utils/checkIdValidity');
const { setErrorType } = require('../utils/setErrorType');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
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
    throw new BadRequestError();
  }
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      // if (req.params.cardId !== req.user._id) {
      //   throw new UnauthorizedError();
      // }

      res.send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    throw new BadRequestError();
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  if (!checkIdValidity(req.params.cardId)) {
    throw new BadRequestError();
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
