const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  setUserInfo,
  getUserInfo,
  setAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^https?:\/\/(www\.)?(\w?[-._~:/?#[\]@!$&'()*+,;=]?)+\.(\w?[-._~:/?#[\]@!$&'()*+,;=]?)+#{0,1}$/),
    }).unknown(true),
  }),
  setUserInfo,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^https?:\/\/(www\.)?(\w?[-._~:/?#[\]@!$&'()*+,;=]?)+\.(\w?[-._~:/?#[\]@!$&'()*+,;=]?)+#{0,1}$/),
    }).unknown(true),
  }),
  setAvatar,
);

module.exports = router;
