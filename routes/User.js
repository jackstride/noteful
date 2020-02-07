const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const createError = require("http-errors");
const { userValidationRules, validate } = require("../middleware/validation");

const User = require("../models/User");

router.post("/register", userValidationRules(), validate, (req, res, next) => {
  console.log("user Routes");
  let { firstName, lastName, email, password } = req.body.formValues;

  let saltRounds = 15;

  User.find({ email })
    .exec()
    .then(user => {
      if (user.length) {
        next(createError(409, "User Exists with this email"));
      } else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            next(newcreateError(500, "Problem with server"));
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
            user.save().then(result => {
              res.status(201).json({
                message: "Register Successful"
              });
            });
          });
        });
      }
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.find({
    email
  })
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
            _id: user[0].id
          };

          jtw.sign(
            payload,
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            },
            (err, token) => {
              res.cookie("access_token", token, {
                maxAge: 9000000,
                httpOnly: true
              });
              res.status(200).json({ user: payload });
            }
          );
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err
      });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
  console.log(req.cookies);
});

module.exports = router;
