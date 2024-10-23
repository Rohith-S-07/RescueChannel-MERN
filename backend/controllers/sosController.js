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


exports.updateSOSStatus = async (req, res) => {
  try {
    const { status, completedByAgency, chatRoomCreated } = req.body;
    const sosId = req.params.id;

    const updatedSOS = await SOS.findByIdAndUpdate(
      sosId,
      { status, completedByAgency, chatRoomCreated },
      { new: true }
    );

    if (!updatedSOS) {
      return res.status(404).json({ message: 'SOS report not found' });
    }

    res.status(200).json({ message: 'SOS status updated', data: updatedSOS });
  } catch (error) {
    console.error('Error updating SOS status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
