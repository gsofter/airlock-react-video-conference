const roomRouter = require("express").Router();
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");

/**
 *
 * @deprecated
 */
roomRouter.get("/leave", auth, roomControl.leaveRoom);
roomRouter.post("/", auth, roomControl.createRoom);
roomRouter.delete("/", auth, roomControl.deleteRoom);
roomRouter.get("/join", auth, roomControl.joinRoom);
roomRouter.get("/join_random", auth, roomControl.joinRandomRoom);
roomRouter.get("/members", auth, roomControl.getRoomMembers);

roomRouter.post("/set_stream_url", roomControl.setStreamUrl);
module.exports = roomRouter;
