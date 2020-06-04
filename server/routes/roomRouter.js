const roomRouter = require("express").Router();
const roomControl = require("../controllers/roomControl");
const jwtParser = require("../middleware/jwtParser");
roomRouter.post("/set_stream_url", jwtParser, roomControl.setStreamUrl);
roomRouter.post("/unlock_request", jwtParser, roomControl.unLockRequest);
roomRouter.post("/unlock_accept", jwtParser, roomControl.unLockAccept);
roomRouter.post("/lock_request", jwtParser, roomControl.lockRequest);

roomRouter.get("/mic", jwtParser, roomControl.mic);
roomRouter.post("/message", jwtParser, roomControl.message);
module.exports = roomRouter;
