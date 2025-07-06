const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.post('/', logController.saveLog);
router.get('/', logController.getLog);

module.exports = router;