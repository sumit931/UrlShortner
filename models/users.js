const mongoose = require('mongoose');
// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create User Model
// const User = mongoose.model('User', userSchema);
require('./../helpers/database.js');
console.log("testing hone do");
module.exports = mongoose.model("User",userSchema)

// module.exports = User;
