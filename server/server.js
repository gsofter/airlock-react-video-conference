const express = require("express");
const router = require("./routes/router");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const whitelist = ["http://localhost:3000", "https://squareparty.netlify.app"];
const corsOptions = {
  origin: whitelist,
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/", router);

app.listen(process.env.PORT || 5000, () =>
  console.log("token server running on 5000")
);
