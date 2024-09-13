const express = require('express');
const router = express.Router();
const { getAllUsers, approveUser, deleteUser } = require('../controllers/adminController');

router.get('/users', getAllUsers);

// Route to approve a user
router.put('/users/:id/approve', approveUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
