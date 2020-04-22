const jwt = require("jsonwebtoken");
const models = require("../models");

/**
 *
 * Returns token for corresponding user for accesscode
 *
 * @method POST
 * @param { passcode: ''}
 * @return { token, user, room }
 */
const login = async (req, res, next) => {
  try {
    // get input passcode
    const { passcode } = req.body;
    const { User, Room } = models;
    // find user for passcode
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["room_name", "user_name", "access_code"],
    });

    // generate token
    const userData = {
      access_code: user.access_code,
      user_name: user.user_name,
      room_name: user.room_name,
    };
    const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token, user });
  } catch (err) {
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};

/**
 *
 * Returns user data for corresponding user for accesscode
 *
 * @method GET
 * @param
 * @return { token, user, room }
 */
const getUser = async (req, res, next) => {
  try {
    console.log("GET USER CALLED!");
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

    const { User, Room } = models;
    // get user
    const user = await User.findOne({
      where: { access_code: decodedToken.access_code },
      attributes: ["room_name", "user_name", "access_code"],
    });

    if (user) {
      const userData = {
        access_code: user.access_code,
        user_name: user.user_name,
        room_name: user.room_name,
      };
      const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.send({ token, user });
    } else {
      res.status(404).json({
        error: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};
module.exports = { login, getUser };
