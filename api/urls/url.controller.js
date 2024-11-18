const router = require('express').Router();
const service  = require("./url.service.js");
const schema = require("./url.schema.js");
const {validateSchema} = require("./../../middlewares/schema-validation.js");
const {authorization} = require("./../../middlewares/authorization.js");

router.post('/short-url',
  authorization,
  validateSchema(schema.createShortUrl),service.createShortUrl);


module.exports = router;