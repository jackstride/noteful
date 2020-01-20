const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jtw = require("jsonwebtoken");
const auth = require("../middleware/auth");
const axios = require("axios");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

router.post(
  "/register",
  [
    check("firstName", "Enter a first name")
      .not()
      .isEmpty(),
    check("email", "There is no email").isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ error: errors.array().map(err => err.msg) });
    }

    // Make errors into an array always
    let { firstName, lastName, email, password } = req.body;

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
            if (err) {
              res.status(500).json({ err });
            }
            bcrypt.hash(password, salt).then(hash => {
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
  }
);

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.find({ email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }

      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }

        if (result) {
          const payload = {
            email: user[0].email,
            userId: user[0].id
          };

          jtw.sign(
            payload,
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            },
            (err, token) => {
              console.log("helllo");
              res.cookie("access_token", token, {
                maxAge: 9000000,
                httpOnly: true
              });
              console.log(res);
              res.sendStatus(200);
            }
          );
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie('access_token').sendStatus(200);
  console.log(req.cookies)
});

module.exports = router;
