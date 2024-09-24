const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');

// Get all SOS reports
router.get('/', sosController.getAllSOS);

// Create a new SOS report
router.post('/', sosController.createSOS);

module.exports = router;
