const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  // Connect to database
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Database connected..");
  } catch (err) {
    // Catch, print error and exit
    console.error(err);
    console.log("Database Not connected");
    process.exit(1);
  }
};

module.exports = connectDB;
