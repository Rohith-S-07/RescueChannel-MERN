const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password, status, role, region, district, state, description, latitude, longitude } = req.body;
  const licenseDocument = req.file ? req.file.path : null;

  // Validate fields
  if (!name || !email || !password || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields including name, email, password, latitude, and longitude are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      status,
      role,
      licenseDocument,
      region,
      district,
      state,
      description,
      location: {
        latitude,
        longitude
      }
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Authenticate a user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ 
      message: 'Logged in successfully', 
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.error('Authentication error:', error);
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
