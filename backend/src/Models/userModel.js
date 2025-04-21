const mongoose = require('mongoose');
const farmDetailsSchema = require('./farmDetails');

const userSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
    match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String,
    required: true
  },
  farmDetails: [farmDetailsSchema] // embedded array of farm detail objects
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;