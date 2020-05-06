const jwt = require("jsonwebtoken");
const models = require("../models");
const HttpStatus = require("http-status-codes");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

/**
 *
 * Returns token for user with passcode
 * - user not exist => 404 {type: 'USER_NOT_FOUND'}
 *
 * @method POST
 * @param { passcode: ''}
 * @return { token: string }
 */
const login = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    const { User, Room } = models;
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["name", "access_code", "room_name"],
    });

    if (!user) {
      // user not exist => 404 {type: 'USER_NOT_FOUND'}
      res.status(HttpStatus.NOT_FOUND).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    // const userData = {
    //   access_code: user.access_code,
    // };

    // // generate token
    // const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
    //   expiresIn: "24h",
    // });
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    );

    console.log(`TOKEN GENERATED => ${token} for ${user.name}`);
    res.send({ token });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * Returns user data for corresponding user for accesscode
 * - user not found => 401 { type: 'USER_NOT_FOUND' }
 * - if user don't have room, returns room filed as null
 *
 * @method GET
 * @param
 * @return {* user: {}, room: {} }
 * @description user => { access_code: string, name: string, my_room_name: string}
 * @description room => { name: string, owner_access_code: string, mode: string, members: string, isOwner: boolean}
 */
const getAuth = async (req, res, next) => {
  try {
    console.log("GET AUTH CALLED!");
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    const { User, Room } = models;
    // get user
    const user = await User.findOne({
      where: { access_code: decodedToken.access_code },
      attributes: ["id", "name", "access_code", "room_name"],
    });

    if (!user) {
      // user not found => 401 { type: 'USER_NOT_FOUND' }
      res.status(HttpStatus.UNAUTHORIZED).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    let roomData = {};
    if (!user.room_name) {
      // if user doesn't have the room_name
      roomData = null;
    } else {
      const room = await Room.findOne({
        where: { name: user.room_name },
        attributes: ["name", "owner_access_code", "mode"],
      });

      if (room) {
        const members = await User.findAndCountAll({
          where: { room_name: room.name },
          attributes: ["name"],
        });

        roomData = {
          name: room.name,
          owner_access_code: room.owner_access_code,
          mode: room.mode,
          isOwner: room.owner_access_code === user.access_code ? true : false,
          members: members.rows,
        };
      } else {
        // if user have room_name but room with room_name not exist on database
        // set user.room_name = ''
        user.room_name = "";
        await user.save();
        roomData = null;
      }
    }

    const myRoom = await Room.findOne({
      where: { owner_access_code: user.access_code },
      attributes: ["name"],
    });

    let my_room_name = myRoom ? myRoom.name : "";
    const userData = {
      name: user.name,
      access_code: user.access_code,
      my_room_name: my_room_name,
    };

    console.log(userData);
    res.send({ user: userData, room: roomData });
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

module.exports = { login, getAuth };
