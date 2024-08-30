const express = require('express');
const router = express.Router();
const { getAllAgencies, updateAgencyStatus } = require('../controllers/agencyController');

router.get('/agencies', getAllAgencies);
router.put('/agencies/:id/status', updateAgencyStatus);

module.exports = router;
