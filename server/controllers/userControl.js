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
    const { passcode } = req.body;
    const { User } = models;
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["room_name", "user_name", "access_code"],
    });

    if (user) {
      console.log("user => ", user);
      const userData = {
        user_name: user.user_name,
        access_code: user.access_code,
        room_name: user.room_name,
      };
      const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      console.log("userData => ", userData);
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

/**
 *
 * Returns user data for corresponding user for accesscode
 *
 * @method GET
 * @param { passcode: ''}
 * @return { token, user, room }
 */
const getUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

    const { User, Room } = models;
    const user = await User.findOne({
      where: { access_code: decodedToken.access_code },
      attributes: ["room_name", "user_name", "access_code"],
    });

    if (user) {
      const userData = {
        user_name: user.user_name,
        access_code: user.access_code,
        room_name: user.room_name,
      };

      const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      const room = Room.findOne({
        where: { access_code: user.access_code },
      });

      roomData = room
        ? {
            name: room.name,
            access_code: room.access_code,
            mode: room.mode,
          }
        : {};

      res.send({ token, user, room: roomData });
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
