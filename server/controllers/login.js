const jwt = require("jsonwebtoken");
const models = require("../models");

const login = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    const { User } = models;
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["room_name", "user_name", "access_code"],
    });

    if (user) {
      const userdata = {
        username: user.user_name,
        accesscode: user.access_code,
        roomname: user.room_name,
      };
      const token = jwt.sign(userdata, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.send(token);
    } else {
      res.status(404).json({
        error: "User new found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};

module.exports = login;
