const express = require("express");
const router = express.Router();
const userControl = require("../controllers/userControl");
const auth = require("../middleware/auth");
const models = require("../models");
const roomRouter = require("./roomRouter");
const userRouter = require("./userRouter");
const twilioRouter = require("./twilioRouter");

//testing route
router.get("/test", function (req, res, next) {
  res.json({ message: "WELCOME to /test route" });
});

router.get("/db/user", async function (req, res, nex) {
  const users = await models.User.findAll({
    attributes: ["room_name", "name", "access_code"],
  });
  res.send(JSON.stringify(users));
});

router.post("/login", userControl.login);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/twilio", twilioRouter);
module.exports = router;
