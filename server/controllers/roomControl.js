const models = require("../models");
const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");
const { Op } = require("sequelize");
const Pusher = require("pusher");

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

// Pusher credentials
const pusherAppId = process.env.PUSHER_APP_ID;
const pusherAppKey = process.env.PUSHER_APP_KEY;
const pusherAppSecret = process.env.PUSHER_APP_SECRET;
const pusherAppCluster = process.env.PUSHER_APP_Cluster;

/**
 *
 * Set Stream URL and broadcast
 *
 * @param room_name
 * @return { type: 'SUCCESS' }
 */
const setStreamUrl = async (req, res, next) => {
  const { Config } = models;
  const url = req.body.url;
  await Config.update(
    {
      value: url,
    },
    {
      where: { key: "stream_url" },
    }
  );

  const pusher = new Pusher({
    appId: pusherAppId,
    key: pusherAppKey,
    secret: pusherAppSecret,
    cluster: pusherAppCluster,
  });

  console.log("URL => ", url);
  pusher.trigger("airlock-channel", "stream-url-change", {
    name: "stream-url",
    message: url,
  });

  console.log("message sent");
  res.send("success");
};

module.exports = {
  createRoom,
  deleteRoom,
  joinRoom,
  joinRandomRoom,
  leaveRoom,
  getRoomMembers,
  setStreamUrl,
};
