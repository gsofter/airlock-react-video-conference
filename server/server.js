const express = require("express");
const router = require("./routes/router");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const proxy = require("http-proxy-middleware");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// app.use(
//   proxy("/**", {
//     // https://github.com/chimurai/http-proxy-middleware
//     target: "http://localhost:5000",
//     secure: false,
//   })
// );
app.use("/", router);

// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("/client/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build"));
// });

app.listen(process.env.PORT || 5000, () =>
  console.log("token server running on 5000")
);
