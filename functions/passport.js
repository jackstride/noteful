const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("./models/User");
const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// Google passport
// Client ID and secret
// Callback URL point towards web app
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://api.noteful.app/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // AccessToken and refeshToken not use
      // Will store as user and retrieve if user exsists or create new
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

// Github authentication
// Client ID and secret
// Callback URL point towards web app

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://api.noteful.app/auth/github/callback",
      scope: "user:email"
    },
    (token, tokenSecret, profile, done) => {
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
            console.log(user);
            user
              .save()
              .then(result => {
                if (result) {
                  return done(null, userData);
                }
                throw result;
              })
              .catch(err => {
                console.log("error");
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
