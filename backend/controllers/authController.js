const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
  const { name, email, password, status, role } = req.body;
  const licenseDocument = req.file ? req.file.path : null; // Handle file upload

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      status,
      role,
      licenseDocument, // Save file path in user document
    });

    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Authenticate a user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ 
      message: 'Logged in successfully', 
      userId: user._id // Include _id in the response
    });

  } catch (error) {
    console.error('Authentication error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

const validateUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (user) {
      res.status(200).json({ valid: true });
    } else {
      res.status(404).json({ valid: false });
    }
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ valid: false, message: 'Server error' });
  }
};


module.exports = { registerUser, authUser, validateUserId };
