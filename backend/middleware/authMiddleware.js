const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.cookie) {
    token = req.headers.cookie.split('connect.sid=')[1]; // Extract the session ID from the cookie
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    req.session = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(req.session.id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
