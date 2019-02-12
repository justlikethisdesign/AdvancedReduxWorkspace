const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
});

// On Save Hook, excrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
    const user = this;

    // Generate a salt, then run callback
    bcrypt.genSalt(10, function(err, salt){
        if(err){ return next(err); }

        // Hash password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password, with encrypted model
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidate.Password, this.password, function(err, isMatch){
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
