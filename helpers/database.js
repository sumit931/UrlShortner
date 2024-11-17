const mongoose = require('mongoose');
const config = require("../config/config.js");
const dbUri = config.dbUri;
const mongoconnection = mongoose.connect(dbUri)
.then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log("error found"+err);
})
module.exports = mongoconnection;
