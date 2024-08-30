const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware'); // Ensure this path is correct
const { getAgencies, updateAgencyStatus } = require('../controllers/adminController'); // Ensure this path is correct

// Define routes and use middleware
router.route('/')
  .get(protect, admin, getAgencies); // Ensure getAgencies is defined in adminController

router.route('/:id')
  .put(protect, admin, updateAgencyStatus); // Ensure updateAgencyStatus is defined in adminController

module.exports = router;