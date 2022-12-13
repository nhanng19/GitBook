const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
} = require('../../controllers/userController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/Profile').get(authMiddleware, getSingleUser);

module.exports = router;
