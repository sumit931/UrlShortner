const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    url: {
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
    username : {
      type : String,
      required : true,
    }
  });
  
  
  require('./../helpers/database.js');
  const URLS = mongoose.model('URLS', urlSchema);
  
  module.exports = URLS;
  