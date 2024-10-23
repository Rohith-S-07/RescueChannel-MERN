const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  respondentName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emergencyType: {
    type: String,
    required: true,
  },
  affectedPeople: {
    type: Number,
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
    required: true,
  },
  completedByAgency: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SOS = mongoose.model('SOS', sosSchema);

module.exports = SOS;
