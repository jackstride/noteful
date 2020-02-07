const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const createError = require("http-errors");
const { userValidationRules, validate } = require("../middleware/validation");

const User = require("../models/User");

router.post("/register", userValidationRules(), validate, async (req, res, next) => {
    let { firstName, lastName, email, password } = req.body;

    let saltRounds = 15;

    try {
      let user = await User.find({ email }).exec();

      user.length
        ? next(createError(409, "User Exists with this email"))
        : (salt = await bcrypt.genSaltSync(saltRounds));

      salt
      ? hash = await bcrypt.hash(password, salt)
      : next(createError(500, " Salt Server Error"))
      hash
      ? user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hash
            })
      : next(createError(500, " Database register error"))

      let result = await user.save()

      result
      ? res.status(201).json({ message: "Register Successful"})
      : next(newcreateError(500, "Problem with server"))
    } catch (err) {}
  });

router.post("/login", async (req, res, next) => {

  let { email, password } = req.body;

  console.log(req.body)

  let user = await User.find({email}).exec();
  user.length < 1 
  ? next(createError(401, " Authorisation Failed"))
  :  match = await bcrypt.compare(password,user[0].password)

  if(match) {
    const payload = {
      email: user[0].email,
      _id: user[0].id
    };

    jtw.sign(payload,process.env.JWT_KEY,
      {
        expiresIn: "1h"
      }, (err, token) => {
        res.cookie("access_token", token, {
          maxAge: 9000000,
          httpOnly: true
        });
        res.status(200).json({ user: payload });
      })
  }
  else {
     next(createError(401, " Password doesn't match")) 
  } 
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
});

module.exports = router;
