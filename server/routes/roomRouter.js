const roomRouter = require("express").Router();
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");
const jwtParser = require("../middleware/jwtParser");
roomRouter.post("/set_stream_url", jwtParser, roomControl.setStreamUrl);
roomRouter.post("/lock_request", jwtParser, roomControl.lockRequest);
roomRouter.post("/lock_accept", jwtParser, roomControl.lockAccept);

roomRouter.get("/mic", jwtParser, roomControl.mic);

module.exports = roomRouter;
