const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const secretkey = config.secretkey;

exports.authorization = (req, res, next) => {
  
  const token = req.cookies?.token; // Use optional chaining to handle cases where cookies are undefined
  if (!token) {
    return res.status(401).json({ message: "Access Denied, no token provided" });
  }

  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ message: "Access Denied, invalid token" });
    }

    // Token is valid
    console.log('Username:', decoded.name);
    req.user = decoded; // Optionally attach the decoded token payload to the request
    return next(); // Only proceed after successful verification
  });
};
