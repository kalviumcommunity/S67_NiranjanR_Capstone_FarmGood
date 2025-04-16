const mongoose = require('mongoose');
const farmDetailsSchema = require('./farmDetails');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  profileName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  farmDetails: [farmDetailsSchema] // embedded array of farm detail objects
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;