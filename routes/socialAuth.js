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
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

  
router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/test", session: false }), (req, res) => {
      console.log("hit");
      let token = req.user.token;
      console.log(token)
    }
  );

//   router.get("/google/callback",passport.authenticate("google"), (req, res) => {
//     console.log("hit");
//     let token = req.user.token;
//     console.log(token)
//   }
// );
  
  module.exports = router;
  