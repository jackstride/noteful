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

const userRoute = require("./routes/User");
const authRoute = require("./routes/appAuth");
const socialAuthRoute = require("./routes/socialAuth");
const FolderRoute = require("./routes/folder");
const tasksRoute = require("./routes/tasks");
const NoteRoute = require("./routes/Note");
const SupportRoute = require("./routes/support");
const auth = require("./middleware/auth");

ConnectDB();

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: [
      "https://noteful.app",
      "https://api.noteful.app",
      "https://api.noteful.app/dashboard",
      "http://localhost:5000",
      "http://localhost:3000"
    ],
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// app.use(
//   require("express-session")({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// app.use(
//   cors({
//     origin: "http://localhost:5000",
//     credentials: true,
//     allowedHeaders: "Content-Type"
//   })
// );

app.use("/user", userRoute);
app.use("/dashboard", authRoute);
app.use("/auth", socialAuthRoute);
app.use("/", auth, FolderRoute);
app.use("/", auth, tasksRoute);
app.use("/", auth, NoteRoute);
app.use("/", SupportRoute);

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
