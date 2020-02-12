const express = require("express");
const router = express.Router();
const jtw = require("jsonwebtoken");
const auth = require("../middleware/auth");
const passport = require('passport')



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
          res.redirect("http://localhost:3000/dashboard")
        }
      );
    }
  );
  
  module.exports = router;





  router.get('/twitter', passport.authenticate('twitter'));

  router.get('/twitter/callback', passport.authenticate('twitter'), (req,res) => {
    res.redirect("http://localhost:3000/dashboard")
  })
  