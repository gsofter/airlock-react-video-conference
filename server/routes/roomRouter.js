const roomRouter = require("express").Router();
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");

roomRouter.post("/set_stream_url", roomControl.setStreamUrl);
roomRouter.post("/lock_request", roomControl.lockRequest);
roomRouter.post("/lock_accept", roomControl.lockAccept);

module.exports = roomRouter;
