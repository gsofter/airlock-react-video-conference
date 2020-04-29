const twilioRouter = require("express").Router();
const auth = require("../middleware/auth");
const twilioControl = require("../controllers/twilioControl");
const models = require("../models");

twilioRouter.get("/token", auth, twilioControl.getTwilioToken);

module.exports = twilioRouter;
