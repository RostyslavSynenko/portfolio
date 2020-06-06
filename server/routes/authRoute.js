const express = require('express');

const {
  authUser,
  validateUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/', authUser);
router.post('/user', validateUser);

module.exports = router;
