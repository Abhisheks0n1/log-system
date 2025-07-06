const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.post('/', logController.ingest);
router.get('/', logController.query);

module.exports = router;