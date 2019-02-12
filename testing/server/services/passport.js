const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy({ localOptions }, function(email, password, done) {
    // Verify this username and password, call done witth the user
    // If it is the correct email and password
    // otherwise call done with false
    User.findOne({ email: email }, function(err, user){
        if (err) { return done(err); }

        // user was not found
        if (!user) { return done(null, false); }

        // Compare passwords - is password equal to user.password

    })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidate.Password, this.password, function(err, isMatch){
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

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
            done( null, false );
        }
    });
});

// Tell Passport to use this strategy
passport.use(jwtLogin);
