const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    if (userData) {
      console.log("user => ", userData.identity);
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
