const models = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.airlock_token;
    const userData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    if (userData) {
      req.auth_user = userData;
      next();
    } else throw "Invalid token";
  } catch {
    console.log("middleware : AUTH : FAILED! ");
    res.status(401).json({
      error: "TOKEN EXPIRED",
    });
  }
};
