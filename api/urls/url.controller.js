const router = require('express').Router();
const service  = require("./url.service.js");
const schema = require("./url.schema.js");
const {validateSchema} = require("./../../middlewares/schema-validation.js");

router.post('/short-url',validateSchema(schema.createShortUrl),service.createShortUrl);


module.exports = router;