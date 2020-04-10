const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const createError = require("http-errors");
const { userValidationRules, validate } = require("../middleware/validation");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const ClearCookie = require("../middleware/clearCookies");
const nodemailer = require("nodemailer");

// Register User
// Error handling with express
router.post(
  "/register",
  [userValidationRules(), validate],
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
          password: hash,
        });
      } else {
        return next(createError(500, " Database register error"));
      }

      let result = await user.save();

      if (result) {
        return res.status(201).json({ user: "Register Successful" });
      } else {
        return next(newcreateError(500, "Problem with server"));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//User login
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  console.log(email, password);

  email = email.toLowerCase();

  let user = await User.find({ email }).exec();

  if (user.length < 1) {
    return next(createError(401, "Please enter a valid email & Password"));
  } else {
    match = await bcrypt.compare(password, user[0].password);
  }

  if (match) {
    const payload = {
      email: user[0].email,
      _id: user[0].id,
      firstName: user[0].firstName,
    };

    jtw.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (token) {
          return res
            .cookie("__session", token, {
              expires: new Date(Date.now() + 9000000),
              // httpOnly: true,
              // secure: true,
              // domain: ".noteful.app"
            })
            .status(200)
            .json({ user: payload });
        } else if (err) {
          return console.log(err);
        }
        throw token;
      }
    );
  } else {
    return next(createError(401, " Please enter a valid email or Password."));
  }
});

//Logout and destroy cookie
router.get("/logout", async (req, res, next) => {
  res
    .clearCookie("__session", {
      // domain: ".noteful.app",
      // httpOnly: true,
      // secure: true
    })
    .send("all done");
});

// Update user route

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

  if (user) {
    update = await User.findOneAndUpdate({ _id }, { $set: updates });
    if (update) {
      return res.status(200).json({ message: "User Updated" });
    } else {
      return next(newcreateError(500, "Problem with server"));
    }
  } else {
    return next(newcreateError(500, "Problem with server"));
  }
});

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_LOGIN, // generated ethereal user
    pass: process.env.GMAIL_L_P, // generated ethereal password
  },
});

router.post("/reset", async (req, res, next) => {
  let { email } = req.body;
  let saltRounds = 5;

  let found = await User.find({ email }).exec();

  if (found) {
    let { _id, email, firstName } = found[0];

    let string =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    console.log(string);

    let salt = await bcrypt.genSaltSync(saltRounds);

    if (salt) {
      hash = await bcrypt.hash(string, salt);

      if (hash) {
        let update = await User.findByIdAndUpdate({ _id }, { password: hash });

        if (update) {
          let info = await transporter.sendMail({
            from: "support@noteful.app",
            to: email,
            subject: "Support Request",
            text: `Hello ${firstName}! You tempory password has been reset to ${string}, you are able to change your password again in the setttings meny. Thankyou `,
          });

          try {
            if (info) {
              return res.send(200).json({ message: sent });
            } else {
              return next(createError(404, "There was an error"));
            }
          } catch (err) {
            return next(createError(404, "There was an error"));
          }
        }
      } else {
        return next(createError(500, "hash not found"));
      }
    } else {
      return next(createError(500, "Salt Failed"));
    }
  } else {
    return next(createError(500, "User not found"));
  }

  // if (found) {
  // /// https://gist.github.com/6174/6062387 Did'nt want to spend long gen string
  //   let random =
  //     Math.random()
  //       .toString(36)
  //       .substring(2, 15) +
  //     Math.random()
  //       .toString(36)
  //       .substring(2, 15);

  //       if (user.length >= 1) {
  //         return next(createError(409, "User Exists with this email"));
  //       } else {
  //         salt = await bcrypt.genSaltSync(saltRounds);
  //       }

  //       if (salt) {
  //         hash = await bcrypt.hash(password, salt);
  //       } else {
  //         return next(createError(500, " Salt Server Error"));
  //       }

  //       if (hash) {
  //         user = new User({
  //           _id: new mongoose.Types.ObjectId(),
  //           firstName: firstName,
  //           lastName: lastName,
  //           email: email,
  //           password: hash
  //         });
  //       } else {
  //         return next(createError(500, " Database register error"));
  //       }

  // } else {
  //   next(newcreateError(500, "Problem with server"));
  // }

  // res.status(200).json({ hi: "hi" });
});

module.exports = router;
