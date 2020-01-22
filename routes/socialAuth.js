const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jtw = require("jsonwebtoken");
const auth = require("../middleware/auth");
const axios = require("axios");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//Google auth 
router.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));

  
router.get("/google/callback",passport.authenticate("google", { session: false }), (req, res) => {
      let token = req.user.token;
      console.log(token);
      res.cookie("google_token", token, {
        maxAge: 9000000,
        httpOnly: true
      });
      res.redirect("http://localhost:3000?token=" + token)
    }
  );

//   router.get("/google/callback",passport.authenticate("google"), (req, res) => {
//     console.log("hit");
//     let token = req.user.token;
//     console.log(token)
//   }
// );
  
  module.exports = router;
  