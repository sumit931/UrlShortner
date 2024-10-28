const express = require('express');
const {nanoid} = require('nanoid');
const {mongoconnection} = require('./helpers/database.js');
mongoconnection;
const users = require('./models/users.js');
const urls = require('./models/weburl.js');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const secretkey = "MyNameIsSumit";
const config = require("./config/config.js");
const port = config.port;
app.set('view engine','ejs');
app.set('views','./views');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token = "+token);
  if (!token) res.redirect('\login');

  next();
};
app.get('/',authenticateToken,async (req,res)=>{
  const token = req.cookies.token;
  var username = "";
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
    } else {
      // Access the email claim from the decoded token
      username = decoded.name;
      
      console.log('Username:', username);
    }
  });
  const getAll = await urls.find({'Username':username});
  res.render('index',{uurls: getAll});
})

app.get('/login',(req,res)=>{
  res.render('login');
})
app.get('/register',(req,res)=>{
  res.render('register');
})
app.get('/adding/:newroute',async(req,res)=>{
  console.log(req.params.newroute);
  await urls.findOne({'nanoURL':req.params.newroute})
  .then(results => {
    console.log("showing results = "+results.URL);
    // urls.findOneandUpdate({'nanoURL':req.params.newroute})
    res.redirect(results.URL);
    urls.updateOne(
      {'nanoURL':req.params.newroute},
      { $inc: { count: 1 } })
      .then(result=>{
        console.log("Data Updated");
      })
      .catch(err=>{
        console.log("We find an error = "+error);
      })
  })
  .catch(error => {
    console.log("we are getting error = "+error);
  });
})
app.post('/',async(req,res)=>{
  
  console.log(req.body);
  const id = nanoid(10);
  const token = req.cookies.token;
  var username = "";
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
    } else {
      // Access the email claim from the decoded token
      username = decoded.name;
      
      console.log('Username:', username);
    }
  });
  const newData = new urls({
      URL: req.body.URL,
      nanoURL : id,
      Username : username
  });
  // res.redirect(req.body.URL);
  newData.save()
  .then(result=>{
    res.redirect('/');
    console.log("data saved");
  })
  .catch(error=>{
    console.log("error detected = "+error);
  })
})
app.post('/register',async (req,res)=>{
console.log(req.body);
const currentDate = new Date();
if(req.body.password!==req.body.confirmPassword)
{
   res.redirect('/register');
}
const ppasword = await bcrypt.hash(req.body.password,10);
const newData = new users({
  name:req.body.username,
  email:req.body.email,
  password: ppasword,
  createdAt: currentDate
});
  newData.save()
    .then(result=>{
      console.log('Data saved successfully',result);
    })        
    .catch(err=>{
      console.log("Error detected"+err);
    });
    res.redirect('login');
})

app.post('/login',async (req,res)=>{
  await users.findOne({'name':req.body.username })
  .then(results => {
    bcrypt.compare(req.body.password,results.password)
    .then(function(resu){
      if(resu){
        
        const token = jwt.sign({name : results.name},secretkey);
        console.log("generated token"+token);
        res.cookie('token',token);
        res.redirect('/');
      }
      else
      {
        res.render('/login');
        // console.log("hello how you doing");
      }
    })
    .catch(err => {
      res.render('/login');
      console.log(err)
    })
    
  })
  .catch(err => {
    res.render('login');
    // console.log("error = "+err);
  })
})
module.exports = app;
// app.listen(port,()=>{
//     console.log('server is responding');
// })