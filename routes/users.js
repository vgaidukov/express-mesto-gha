const router = require('express').Router();
const {
  getUsers,
  getUser,
  setUserInfo,
  setAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setAvatar);

module.exports = router;
