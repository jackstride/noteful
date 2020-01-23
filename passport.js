const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/User');

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

        User.find({email: profile.emails[0].value})
        .then(user => {
            if(user.length) {
                console.log("there is a user")
            }
            else {
                // Sign up the user here
                const user = new User({
                    _id: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email:profile.emails[0].value,
                    password: null,
                })

                console.log(user);
            }
            
        }).catch(err => {
            console.log(err)
        })

        

        let userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken,
        };
        done(null,userData)

        //Next steps
        // Save user in database
        //Check is user exists
        //Research More
    })
);