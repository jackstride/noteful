const express = require("express");
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ConnectDB = require("./dbConnect");
const passport = require('passport');
require("./passport");
require('dotenv').config()

const userRoute = require('./routes/User');
const toDoRoute = require('./routes/toDo');
const authRoute = require('./routes/appAuth')
const socialAuthRoute = require('./routes/socialAuth');

//Connect To Database
ConnectDB();
const app = express();

// Enable Body Parster to accept request.
app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Acess-Control-Allow-Credentials", "true");
  next();
}); 

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

passport.serializeUser((user,done) => {
  done(null,user);
})

passport.deserializeUser((user,done) => {
  done(null,user)
})

app.use(passport.initialize());
app.use(cors({origin: "http://localhost:3000"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());



app.use('/user', userRoute);
app.use('/add', toDoRoute);
app.use('/dashboard', authRoute);
app.use('/auth', socialAuthRoute);
 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.use(express.static("build"));