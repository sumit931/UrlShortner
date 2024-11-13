const mongoose = require('mongoose');
const URLSchema = new mongoose.Schema({
    URL: {
      type: String,
      required: true,
    },
    nanoURL: {
      type: String,
      required:true,
      unique:true
    },
    count : {
      type: Number,
      default:0
    },
    Username : {
      type : String,
      required : true,
      unique :true
    }
  });
  
  
  // Create User Model
  require('./../helpers/database.js');
  const URLS = mongoose.model('URLS', URLSchema);
  
  module.exports = URLS;
  