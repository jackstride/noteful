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
      console.log("THIS IS THE OTHER " + token);
      
      // res.cookie("google_token", token, {
      //   maxAge: 9000000,
      //   httpOnly: true
      // });
      res.redirect("http://localhost:3000?token=" + token)
    }
  );

  // const payload = {
  //   email: req.userData.email,
  //   name: req.userData.name,
  // }
  // console.log(req.userData)
  
  //  res.cookie("google_token",
  //  jwt.sign(payload,
  //   process.env.JWT_KEY,{
  //   expiresIn: "1h"
  // }),
  // {
  //   maxAge: 9000000,
  //   httpOnly: true
  // });
  // res.redirect("http://localhost:3000?token=" + token)
  
  module.exports = router;
  