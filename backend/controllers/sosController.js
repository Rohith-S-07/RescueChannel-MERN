const SOS = require('../models/sosModel');

exports.getAllSOS = async (req, res) => {
  try {
    const reports = await SOS.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching SOS reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createSOS = async (req, res) => {
  try {
    const { respondentName, phoneNumber, emergencyType, affectedPeople, location } = req.body;

    const newSOS = new SOS({
      respondentName,
      phoneNumber,
      emergencyType,
      affectedPeople: Number(affectedPeople),
      location,
      createdAt: new Date(),
    });

    await newSOS.save();
    res.status(201).json({ message: 'SOS reported successfully', data: newSOS });
  } catch (error) {
    console.error('Error creating SOS:', error);
    res.status(500).json({ message: 'Error reporting SOS', error });
  }
};
