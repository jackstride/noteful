const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ConnectDB = require("./dbConnect");

const userRoute = require('./routes/User');
const toDoRoute = require('./routes/toDo');
const authRoute = require('./routes/auth')

//Connect To Database
ConnectDB();

// Enable Body Parster to accept request.
app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', userRoute);
app.use('/add', toDoRoute);
app.use('/auth', authRoute);
 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.use(express.static("build"));