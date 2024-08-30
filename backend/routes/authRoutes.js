const express = require('express');
const router = express.Router();
const { registerUser, authUser, validateUserId } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', authUser);

router.get('/validatesession/:id', validateUserId);

// Route to get session info
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
