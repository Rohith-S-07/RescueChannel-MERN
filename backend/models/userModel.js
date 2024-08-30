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
    default: 'onprocess', // Default status value
  },
  role: {
    type: String,
    default: 'agency' // Default role value
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
