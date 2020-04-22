const models = require("../models");
const jwt = require("jsonwebtoken");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

/**
 *
 * @param { access_code, name, mode } req
 */

const createRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { access_code, name, mode } = req.body;
    const newRoom = await Room.create(
      { name, access_code, mode },
      { fields: ["name", "access_code", "mode"] }
    );

    if (newRoom) {
      await User.update(
        {
          room_name: newRoom.name,
        },
        {
          where: { access_code: access_code },
        }
      ); // update user.room_name

      console.log(newRoom);
      res.status(200).json({ room_name: newRoom.name });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};

/**
 *
 *
 * @param {room_name, access_code} req
 */

const deleteRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { room_name, access_code } = req.query;
    console.log("room_name", room_name);
    console.log("access_code", access_code);
    await Room.destroy({
      where: {
        name: room_name,
      },
    });
    await User.update(
      { room_name: "" },
      {
        where: {
          room_name: room_name,
        },
      }
    );

    const user = User.findOne({
      where: {
        access_code: access_code,
      },
    });
    console.log("ROOM DELETED USER", user);
    const userData = {
      user_name: user.user_name,
      access_code: user.access_code,
      room_name: user.room_name,
    };
    const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET);
    res.send({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.original.detail,
    });
  }
};

module.exports = { createRoom, deleteRoom };
