const express = require('express');

const {
  getHealth
} = require('../controllers/healthCheckController');

const router = express.Router();

router.get('/', getHealth);

module.exports = router;
