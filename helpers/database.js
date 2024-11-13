const mongoose = require('mongoose');
const config = require("../config/config.js");
const dbUri = config.dbUri;
console.log(dbUri,"checking");
const mongoconnection = mongoose.connect(dbUri)
.then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log("error found"+err);
})
module.exports = mongoconnection;
