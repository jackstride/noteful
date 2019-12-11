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

router.get(
    "/google",
    passport.authenticate('google', { scope: ["profile", "email"]})
  );
  
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/test", session: false }),
    (req, res) => {
      res.redirect("/test")
        console.log(res);
      let token = req.user.token;
      console.log(token)
    }
  );
  
  module.exports = router;
  