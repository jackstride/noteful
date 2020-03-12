const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const TwitterStrategy = require("passport-twitter").Strategy;

const User = require("./models/User");

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      let userData = {
        _id: new mongoose.Types.ObjectId(),
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        password: null,
        token: accessToken,
        google_id: profile.id
      };

      User.find({ email: profile.emails[0].value })
        .then(user => {
          if (user.length) {
            done(null, user[0]);
          } else {
            const user = new User(userData);
            user.save().then(result => {
              done(null, userData);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

// Twitter authentication

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/twitter/callback",
      includeEmail: true
    },
    function(token, tokenSecret, profile, done) {

      //Might new auth token for future?
      console.log(profile);
      let userData = {
        _id: new mongoose.Types.ObjectId(),
        firstName: profile._json.name,
        lastName: null,
        email: profile._json.email,
        password: null,
        twitter_id: profile._json.id
      };

      User.find({ email: profile._json.email})
        .then(user => {
          if (user.length) {
            done(null,user[0])
          } else {

            const user = new User(userData);
            user.save().then(result => {
              done(null, userData);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
