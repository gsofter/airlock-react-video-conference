const models = require("../models");
const jwt = require("jsonwebtoken");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const createRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { access_code, name, mode } = req.body;

    console.log(req.body);
    const newRoom = await Room.create(
      { name, access_code, mode },
      { fields: ["name", "access_code", "mode"] }
    );
    res.status(200).json(newRoom);
    // const token = new AccessToken(
    //   twilioAccountSid,
    //   twilioApiKeySID,
    //   twilioApiKeySecret,
    //   {
    //     ttl: MAX_ALLOWED_SESSION_DURATION,
    //   }
    // );
    // const videoGrant = new VideoGrant({ room: decodedToken.roomname });
    // token.identity = decodedToken.username;
    // token.addGrant(videoGrant);
    // res.send(token.toJwt());
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.original.detail,
    });
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const accessToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(accessToken, process.env.AUTH_TOKEN_SECRET);
    const { accesscode } = decodedToken;
    const { passcode } = req.body;
    const room = await Room.findOne({ where: { access_code: passcode } });
    await room.detroy();
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["room_name", "user_name", "access_code"],
    });
    user.room_name = "";
    await user.save();

    const token = jwt.sign(
      {
        username: user.user_name,
        accesscode: user.access_code,
        roomname: user.room_name,
      },
      process.env.AUTH_TOKEN_SECRET
    );
    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.original.detail,
    });
  }
};

module.exports = { createRoom, deleteRoom };
