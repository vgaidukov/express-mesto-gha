const { getUsers, getUser, createUser, setUserInfo, setAvatar } = require('../controllers/users');

const router = require('express').Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setAvatar);

module.exports = router;