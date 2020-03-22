const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const TwitterStrategy = require("passport-twitter").Strategy;

const User = require("./models/User");

require("dotenv").config();

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
      // callbackURL: "https://api.noteful.app/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("hit");
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
            return done(null, user[0]);
          } else {
            const user = new User(userData);
            user
              .save()
              .then(result => {
                if (result) {
                  return done(null, userData);
                } else {
                  return console.log("error");
                }
              })
              .catch(err => {
                return console.log(err);
              });
          }
          throw user;
        })
        .catch(err => {
          return console.log(err);
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
      // callbackURL: "https://api.noteful.app/auth/twitter/callback",
      includeEmail: true
    },
    (token, tokenSecret, profile, done) => {
      //Might new auth token for future?

      let userData = {
        _id: new mongoose.Types.ObjectId(),
        firstName: profile._json.name,
        lastName: null,
        email: profile._json.email,
        password: null,
        twitter_id: profile._json.id
      };

      User.find({ email: profile._json.email })
        .then(user => {
          if (user.length) {
            return done(null, user[0]);
          } else {
            const user = new User(userData);
            user
              .save()
              .then(result => {
                if (result) {
                  return done(null, userData);
                }
                throw result;
              })
              .catch(err => {
                return console.log(err);
              });
          }
          throw user;
        })
        .catch(err => {
          return console.log(err);
        });
    }
  )
);
