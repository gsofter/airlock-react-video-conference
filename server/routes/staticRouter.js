const express = require("express");
const router = express.Router();
const path = require("path");
router.get("/", function (req, res, next) {
  //   const baseDir = process.cwd();
  //   console(path.join(baseDir, "/client/build/", "index.html"));
  //   res.sendFile(path.join(baseDir, "/client/build/", "index.html"));
});
module.exports = router;
