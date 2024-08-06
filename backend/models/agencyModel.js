const mongoose = require('mongoose');

const agencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
