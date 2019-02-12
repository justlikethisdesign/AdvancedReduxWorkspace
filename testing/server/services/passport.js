const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt.ExtractJwt');

// Setup options for JWT strategy
const jwtOptions = {};

// Create JWT Strategy
create jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // otherwise call done without user object
    User.findById(payload.sub, function(err, user) {

        // If error, return the error, and say we havnt found a user
        if (err) { return done(err, false); }

        if (user) {
            // we found the user, no error, here is the user
            done( null, user );
        } else {
            // We did a search, no error, but didnt find a user
            done( null, false )
        }

    });

});

// Tell Passport to use these options
