const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user)
})


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken,refreshToken,profile,done) => {
        let userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken,
        };
        console.log(userData)
        done(null,userData)

        //Next steps
        // Save user in database
        //Check is user exists
        //Research More
    })
);