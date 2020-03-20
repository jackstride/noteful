const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const createError = require("http-errors");

require("./passport");
require("dotenv").config();

ConnectDB();
const app = express();

const userRoute = require("./routes/User");
const authRoute = require("./routes/appAuth");
const socialAuthRoute = require("./routes/socialAuth");
const FolderRoute = require("./routes/folder");
const tasksRoute = require("./routes/tasks");
const NoteRoute = require("./routes/Note");
const SupportRoute = require("./routes/support");

app.use("*", function(req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/dashboard", authRoute);
app.use("/auth", cors(), socialAuthRoute);
app.use("/", cors(), FolderRoute);
app.use("/", cors(), tasksRoute);
app.use("/", cors(), NoteRoute);

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

exports.app = functions.https.onRequest(app);
