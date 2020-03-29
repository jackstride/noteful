const functions = require("firebase-functions");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const ConnectDB = require("./dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const createError = require("http-errors");

//.env config
require("./passport");
require("dotenv").config();

// Define routes
const userRoute = require("./routes/User");
const authRoute = require("./routes/appAuth");
const socialAuthRoute = require("./routes/socialAuth");
const FolderRoute = require("./routes/folder");
const tasksRoute = require("./routes/tasks");
const NoteRoute = require("./routes/Note");
const SupportRoute = require("./routes/support");
const auth = require("./middleware/auth");

//Connect to database
ConnectDB();

//Initialize app variable
const app = express();

//Use cookie parser and body parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors options, origin requests,methods, headers
app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: [
      "https://noteful.app",
      "https://api.noteful.app",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://192.168.1.64:3000"
    ],
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Set-Cookie"
  })
);

// Initialize Passport authentication (Twitter and google)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//Define routes
app.use("/user", userRoute);
app.use("/dashboard", authRoute);
app.use("/auth", socialAuthRoute);
app.use("/", SupportRoute);
app.use("/", auth, FolderRoute);
app.use("/", auth, tasksRoute);
app.use("/", auth, NoteRoute);

// Error handlers
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

// Export app to firebase functions
exports.app = functions.https.onRequest(app);
