const models = require("../models");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    const { User } = models;
    const user = await User.findOne({
      where: { access_code: decodedToken.accesscode },
      attributes: ["room_name", "user_name", "access_code"],
    });

    console.log(user);
    if (user) {
      next();
    } else throw "Invalid token";
  } catch {
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
