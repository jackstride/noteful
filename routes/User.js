const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/", (req, res) => {
  let { firstName, lastName, email, password } = req.body.formValues;
  let saltRounds = 15;

  User.find({
    email
  })
    .exec()
    .then(user => {
      if (user.length) {
        return res.status(409).json({
          error: "User already exists with this email"
        });
      } else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          err
            ? res.status(500).json({ err })
            : bcrypt.hash(password, salt).then(hash => {
                password = hash;

                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password
                });

                user
                  .save()
                  .then(result => {
                    res.status(201).json({ message: "Register Successful" });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
        });
      }
    });
});

module.exports = router;
