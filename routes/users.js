const router = require('express').Router();
const {
  getUsers,
  getUser,
  setUserInfo,
  // getUserInfo,
  setAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
// router.get('/:userId', getUser);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setAvatar);

module.exports = router;
