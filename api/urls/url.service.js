const {nanoid} = require('nanoid');
const config = require("./../../config/config.js");
const secretkey = config.secretkey;
const jwt = require('jsonwebtoken');
const queries = require("./url.queries");

exports.createShortUrl = async(req,res,next)=>{
    const id = nanoid(10);
    const token = req.cookies.token;
    var username = "";
    const createQuery = {};
    createQuery.url = req.body.url;
    createQuery.nanoURL = id;
    createQuery.username = username;
    queries.createShortUrl(createQuery)
    .then((result)=>{
      res.redirect('/');
      console.log("data saved");
    })
    .catch(error=>{
      console.log("error detected = "+error);
    })
}