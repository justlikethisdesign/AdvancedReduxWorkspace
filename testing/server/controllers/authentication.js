const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// Create a JWT from the user ID and current time
function tokenForuser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {

    // Get details from the body
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {

        if(err) { return next (err); }

        // If a user with email does exist, return an error
        if(existingUser){
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err){ return next(err); }

            // Respond to request indicating user has been created
            res.json({ success: true });
        });

    });

}
