const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerUser, authUser, validateUserId } = require('../controllers/authController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name with timestamp
  },
});

const upload = multer({ storage: storage });

// Route to handle user registration with file upload
router.post('/register', upload.single('licenseDocument'), registerUser);

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
