const express = require("express");
const router = express.Router();
const jtw = require("jsonwebtoken");
const auth = require("../middleware/auth");
const passport = require("passport");

//Google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    console.log("hit");
  }
);

// Redirect url for production https://noteful.app/dashboard
// Redirect for developement http://localhost:3000/dashboard

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const payload = {
      _id: req.user._id,
      email: req.user.email,
      name: ` ${req.user.firstName} ${req.user.lastName}`
    };

    jtw.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      },
      (err, token) => {
        if (token) {
          res
            .cookie("access_token", token, {
              maxAge: 9000000,
              sameSite: true
            })
            .redirect("http://localhost:3000/dashboard");
        } else if (err) {
          console.log(err);
        }
      }
    );
  }
);

module.exports = router;

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    const payload = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.firstName
    };

    jtw.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      },
      (err, token) => {
        if (token) {
          res
            .cookie("access_token", token, {
              maxAge: 9000000,
              httpOnly: true,
              sameSite: true
            })
            .redirect("http://localhost:3000/dashboard");
        } else if (err) {
          console.log(err);
        }
        res.redirect(proces.env.REDIRECT_URL);
      }
    );
  }
);
