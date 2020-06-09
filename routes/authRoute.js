const express = require('express');

const auth = require('../middleware/auth');

const {
  authUser,
  validateUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/', authUser);
router.get('/user', auth, validateUser);

module.exports = router;
