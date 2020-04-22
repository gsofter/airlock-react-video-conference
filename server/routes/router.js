const express = require("express");
const router = express.Router();
const userControl = require("../controllers/userControl");
const auth = require("../middleware/auth");
const models = require("../models");
const roomRouter = require("./roomRouter");
const userRouter = require("./userRouter");

//testing route
router.get("/db/user", async function (req, res, nex) {
  const users = await models.User.findAll({
    attributes: ["roomname", "username", "accesscode"],
  });
  res.send(JSON.stringify(users));
});

router.post("/login", userControl.login);
router.use("/user", userRouter);
router.use("/room", roomRouter);
//router.post("/create_room", auth, roomControl.createRoom);
//router.post("/delete_room", auth, roomControl.deleteRoom);
module.exports = router;
