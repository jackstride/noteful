const functions = require("firebase-functions");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const ConnectDB = require("./dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const createError = require("http-errors");
const FirebaseStore = require("connect-session-firebase")(session);
const firebase = require("firebase-admin");

//Connection to firebase database
const ref = firebase.initializeApp({
  credential: firebase.credential.cert(process.env.CERT_ROUTE),
  databaseURL: process.env.CERT_URL
});

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
      "https://api.noteful.app/dashboard",
      "http://localhost:5000",
      "http://localhost:3000"
    ],
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
  })
);

// Firebase session to use twitter auth
app.use(
  session({
    store: new FirebaseStore({
      database: ref.database()
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
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
app.use("/", auth, FolderRoute);
app.use("/", auth, tasksRoute);
app.use("/", auth, NoteRoute);
app.use("/", SupportRoute);

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
