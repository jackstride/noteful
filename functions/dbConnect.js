const mongoose = require("mongoose");

require('dotenv').config()



const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Database connected..")
    }
    catch(err) {
        console.error(err)
        console.log("Database Not connected")
        process.exit(1);
    }
  }
  
  module.exports = connectDB