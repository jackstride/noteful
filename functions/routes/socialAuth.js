const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ClearCookie = require("../middleware/clearCookies");
const User = require("../models/User");

//Google auth
router.get(
  "/google",
  ClearCookie,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Roputer for google callback
// Redirect url to app
router.get(
  "/google/callback/",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log("hit");

    const payload = {
      _id: req.user._id,
      email: req.user.email,
      name: ` ${req.user.firstName} ${req.user.lastName}`,
    };

    sendTokens(payload, res);
  }
);

// Router for twitter callback
// Redirect url to app
router.get("/github", ClearCookie, passport.authenticate("github"));

router.get("/github/callback/", passport.authenticate("github"), (req, res) => {
  const payload = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.firstName,
  };

  sendTokens(payload, res);
});

async function sendTokens(payload, res) {
  let access_token = await jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
  if (access_token) {
    const one = await User.updateOne(
      { _id: payload._id },
      {
        refresh_token: access_token,
      }
    );
    if (one) {
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        },
        (err, refresh_token) => {
          if (refresh_token) {
            console.log("HIT HERE");
            return res
              .cookie("__session", access_token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true,
                secure: true,
                domain: ".noteful.app",
              })
              .redirect(200, "https://noteful.app/dashboard")
              .json({ user: payload, token: refresh_token });
          } else if (err) {
            return console.log(err);
          }
          throw refresh_token;
        }
      );
    } else {
      return next(createError(401, " Please enter a valid email or Password."));
    }
  } else {
    return next(createError(401, " Please enter a valid email or Password."));
  }
}

module.exports = router;
