const roomRouter = require("express").Router();
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");
roomRouter.get("/join", roomControl.joinRoom);
roomRouter.post("/", auth, roomControl.createRoom);
roomRouter.delete("/", auth, roomControl.deleteRoom);
module.exports = roomRouter;
