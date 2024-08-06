const express = require('express');
const { getAgencies, createAgency } = require('../controllers/agencyController');
const router = express.Router();

router.route('/').get(getAgencies).post(createAgency);

module.exports = router;
