const Agency = require('../models/agencyModel');

const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find({});
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch agencies' });
  }
};

const updateAgencyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const agency = await Agency.findByIdAndUpdate(id, { status }, { new: true });
    if (!agency) {
      res.status(404).json({ message: 'Agency not found' });
    } else {
      res.json(agency);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update agency status' });
  }
};

module.exports = { getAgencies, updateAgencyStatus };
