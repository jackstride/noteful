const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/", (req, res) => {
  let { firstName, lastName, email, password } = req.body.formValues;
  let saltRounds = 15;

  bcrypt.genSalt(saltRounds, (err, salt) => {

    bcrypt.hash(password, salt).then(hash => {

      password = hash;

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      
      user.save().then(result => {
          return console.log('added')
      })
      .catch (err => {
          console.log(err);
      })
    });
    
  });
});

module.exports = router;
