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
      
      const payload = {
        _id: req.user._id,
        email: req.user.email,
        name: ` ${req.user.firstName} ${req.user.lastName}`,
      }
      

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
          console.log(res);
          res.redirect("http://localhost:3000/dashboard")
        }
      );
    }
  );
  
  module.exports = router;
  