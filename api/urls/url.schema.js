const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createShortUrl = {
    body: Joi.object({
        url : Joi.string().required()
    })
}