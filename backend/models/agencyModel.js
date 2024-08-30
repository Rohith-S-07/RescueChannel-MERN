const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ['onprocess', 'approved'], default: 'onprocess' },
});

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
