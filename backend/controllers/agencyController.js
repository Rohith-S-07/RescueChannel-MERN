const User = require('../models/userModel');

// Controller to get all agencies
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await User.find({ role: 'agency' }).select('-password'); // Exclude password from the results
    res.status(200).json(agencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
