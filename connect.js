const mongoose = require('mongoose');
var mongoconnection = mongoose.connect('mongodb://127.0.0.1:27017/URlShortner')
.then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log("error found"+err);
})
module.exports = {mongoconnection};

