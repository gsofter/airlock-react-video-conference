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

const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherAppSecret,
  cluster: pusherAppCluster,
});

/**
 *
 * Set Stream URL and broadcast
 *
 * @param room_name
 * @return { type: 'SUCCESS' }
 */
const setStreamUrl = async (req, res, next) => {
  try {
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

    console.log("URL => ", url);
    pusher.trigger("airlock-channel", "stream-url-change", {
      name: "stream-url",
      message: url,
    });

    console.log("message sent");
    res.send("success");
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * Send Lock Request
 *
 */
const lockRequest = async (req, res, next) => {
  try {
    pusher.trigger("airlock-channel", "lock-request", {
      name: "lock-request",
      message: {
        sender: "sender",
        receiver: "receiver",
      },
    });
    console.log("message sent");
    res.send("message-sent");
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * Accept Lock Request
 *
 */
const lockAccept = async (req, res, next) => {
  try {
    pusher.trigger("airlock-channel", "lock-accept", {
      name: "lock-accept",
      message: {
        sender: "sender",
        receiver: "receiver",
      },
    });
    console.log("lockAccept success");
    res.send("lockAccept success");
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

module.exports = {
  setStreamUrl,
  lockRequest,
  lockAccept,
};
