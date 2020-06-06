const mongoose = require('mongoose');
const { USER, ADMIN } = require('../config/userRole');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [USER, ADMIN],
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
