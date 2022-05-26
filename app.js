var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const socketio = require("socket.io");
var passport = require("passport");
const cors = require("cors");
// require("./services/cache");
const config = require("./services/config");

var indexRouter = require("./routes/index");
//-------------------------------------DATABASE CONNECTIVITY--------------------------------------
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("***DB Connected!***"); //Connection With Server
  },
  (err) => {
    console.log(err);
  }
);
//------------------------------------------------------------------------------------------------
var app = express();
app.use(passport.initialize());
app.use(cors());
app.use("/public//images//", express.static(path.join("public/images/")));
app.use("/public/images/", express.static(path.join("public/images/")));
app.use("/public\\images\\", express.static(path.join("public/images/")));
// Create the http server
const server = require("http").createServer(app);
// Create the Socket IO server on
// the top of http server
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });
});
app.use((req, res, next) => {
  req.io = io;
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public/voice", express.static(path.join("public/voice")));
app.use("/public/images", express.static(path.join("public/images")));
app.use(express.static("public"));

app.use("/v1", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
  // res.render("error");
});

module.exports = { app: app, server: server };
