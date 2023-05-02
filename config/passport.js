const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const mongoose = require("mongoose");

const credentials = require("./credentials");

const {User} = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      callbackURL: "/auth/google/callback",
      clientID: credentials.google.clientId,
      clientSecret: credentials.google.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            new User({
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value,
            })
              .save()
              .then((newUser) => done(null, newUser));
          }
        })
        .then(() => console.log("Logged In"));
    }
  )
);
