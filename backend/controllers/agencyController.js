const Agency = require('../models/agencyModel');

// Get all agencies
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update agency status
exports.updateAgencyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const agency = await Agency.findByIdAndUpdate(id, { status }, { new: true });
    if (!agency) return res.status(404).json({ message: 'Agency not found' });
    res.json(agency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
