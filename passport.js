const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose')
const TwitterStrategy = require('passport-twitter').Strategy;

const User = require("./models/User");

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {

      let generateId = new mongoose.Types.ObjectId(profile.id + "112");

      User.find({ email: profile.emails[0].value })
        .then(user => {
          if (user.length) {
            // User already exists// 
            
          } else {

            // Sign up the user here
            const user = new User({
              _id: generateId,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              password: null
            });
            user.save().then(result => {});
          }
        })
        .catch(err => {
          console.log(err);
        });

      let userData = {
        _id: generateId,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        token: accessToken
      };
      
      done(null, userData);
    }
  )
);






// Twitter authentication

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CLIENT_ID,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  console.log(profile)
}
));
