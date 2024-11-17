const URLS = require("./../../models/weburl.js");

exports.createShortUrl = (createQuery)=>{
    return URLS.create(createQuery);
}