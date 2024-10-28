const app = require("./app.js");
const config = require("./config/config.js");
const port = config.port;
app.listen(config.port,(err)=>{
    if(err) throw err;
    console.log(`server running in ${port} port`);
})