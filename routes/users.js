const router = require('express').Router();
const {
  getUsers,
  getUser,
  setUserInfo,
  getUserInfo,
  setAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', setUserInfo);
router.get('/me', getUserInfo);
router.patch('/me/avatar', setAvatar);

module.exports = router;
