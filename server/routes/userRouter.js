const userRouter = require("express").Router();
// const auth = require("../middleware/auth");
const jwtParser = require("../middleware/jwtParser");
const userControl = require("../controllers/userControl");
// userRouter.get("/", auth, userControl.getUser);
userRouter.get("/check_auth", jwtParser, userControl.checkAuth);
module.exports = userRouter;
