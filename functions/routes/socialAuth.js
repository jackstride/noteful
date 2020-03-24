const express = require("express");
const router = express.Router();
const jtw = require("jsonwebtoken");
const passport = require("passport");

//Google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Roputer for google callback
// Redirect url to app
router.get(
  "/google/callback/",
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
            .cookie("__session", token, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true,
              secure: true,
              domain: ".noteful.app"
            })
            .redirect("https://noteful.app/dashboard");
          // .redirect("http://localhost:3000/dashboard");
        } else if (err) {
          console.log(err);
        }
      }
    );
  }
);

// Router for twitter callback
// Redirect url to app
router.get("/github", passport.authenticate("github"));

router.get("/github/callback/", passport.authenticate("github"), (req, res) => {
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
          .cookie("__session", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            secure: true,
            domain: ".noteful.app"
          })
          .redirect("https://noteful.app/dashboard");
      } else if (err) {
        console.log(err);
      }
      res.redirect(proces.env.REDIRECT_URL);
    }
  );
});

module.exports = router;
