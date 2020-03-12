const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const createError = require("http-errors");
const { userValidationRules, validate } = require("../middleware/validation");

const User = require("../models/User");

router.post(
  "/register",
  userValidationRules(),
  validate,
  async (req, res, next) => {
    let { firstName, lastName, email, password } = req.body;

    let saltRounds = 15;
    email = email.toLowerCase();

    try {
      let user = await User.find({ email }).exec();

      if (user.length >= 1) {
        return next(createError(409, "User Exists with this email"));
      } else {
        salt = await bcrypt.genSaltSync(saltRounds);
      }

      if (salt) {
        hash = await bcrypt.hash(password, salt);
      } else {
        return next(createError(500, " Salt Server Error"));
      }

      if (hash) {
        user = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash
        });
      } else {
        next(createError(500, " Database register error"));
      }

      let result = await user.save();

      if (result) {
        return res.status(201).json({ message: "Register Successful" });
      } else {
        next(newcreateError(500, "Problem with server"));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/login", async (req, res, next) => {
  console.log("hit");
  let { email, password } = req.body;

  email = email.toLowerCase();
  console.log(email);

  let user = await User.find({ email }).exec();
  user.length < 1
    ? next(createError(401, "Please enter a valid email & Password"))
    : (match = await bcrypt.compare(password, user[0].password));

  if (match) {
    const payload = {
      email: user[0].email,
      _id: user[0].id,
      firstName: user[0].firstName
    };

    jtw.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "2 days"
      },
      (err, token) => {
        res.cookie("access_token", token, {
          maxAge: 9000000,
          httpOnly: true
        });
        console.log("hit");
        res.status(200).json({ user: payload });
      }
    );
  } else {
    next(createError(401, " Please enter a valid email or Password."));
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
});

router.patch("/update/:_id", async (req, res, next) => {
  let { _id } = req.params;
  let saltRounds = 10;

  let entries = Object.keys(req.body);
  let updates = {};

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }

  if (updates.password) {
    salt = await bcrypt.genSaltSync(saltRounds);

    updates.password = await bcrypt.hash(updates.password, salt);
  }

  let user = await User.find({ _id });
  console.log("user");

  if (user) {
    update = await User.findOneAndUpdate({ _id }, { $set: updates });

    update
      ? res.status(200).json({ message: "User Updated" })
      : next(newcreateError(500, "Problem with server"));
  } else {
    next(newcreateError(500, "Problem with server"));
  }
});

module.exports = router;
