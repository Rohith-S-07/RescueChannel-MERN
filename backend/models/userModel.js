// Updated user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'onprocess',
  },
  role: {
    type: String,
    default: 'agency',
  },
  licenseDocument: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
