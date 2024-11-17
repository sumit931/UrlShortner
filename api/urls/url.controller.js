const router = require('express').Router();
const {nanoid} = require('nanoid');
const secretkey = "MyNameIsSumit";
const service  = require("./url.service.js");
const schema = require("./url.schema.js");
// const urls = require('./../models/weburl.js');
const urls = require("./../../models/weburl.js");
const {validateSchema} = require("./../../middlewares/schema-validation.js");
const jwt = require('jsonwebtoken');

router.post('/short-url',validateSchema(schema.createShortUrl),service.createShortUrl);


module.exports = router;