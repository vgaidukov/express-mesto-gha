const { getCards, createCard, deleteCard } = require('../controllers/cards');

const router = require('express').Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;