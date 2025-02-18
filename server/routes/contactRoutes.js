const express = require('express');
const router = express.Router();
const { submitContactForm, getContactReports, deleteContactReport } = require('../controllers/contactController');

// Route to handle contact form submissions
router.post('/', submitContactForm);

// Route to fetch all contact reports
router.get('/', getContactReports);

// Route to delete a specific contact report
router.delete('/:id', deleteContactReport);

module.exports = router;
