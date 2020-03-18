const express = require("express");
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ConnectDB = require("./dbConnect");
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

//Connect To Database
ConnectDB();
const app = express();

// Enable Body Parster to accept request.
// Cors confusing
app.use("*", function(req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // res.header("Access-Control-Allow-Credentials", true);
  next();
});

// When in build
app.options("*", cors());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
    allowedHeaders: "Content-Type"
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/dashboard", authRoute);
app.use("/auth", cors(), socialAuthRoute);
app.use("", cors(), FolderRoute);
app.use("", cors(), tasksRoute);
app.use("", cors(), NoteRoute);

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.use(express.static("build"));
