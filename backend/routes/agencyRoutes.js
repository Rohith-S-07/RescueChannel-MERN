const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

// Route to get all agencies
router.get('/agencies', agencyController.getAllAgencies);

module.exports = router;
