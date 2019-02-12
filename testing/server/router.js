const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Passport automatically wants to create sessions -
// we are using tokens so we dont want that
const requireAuth = passport.authenticate('jwt', { session: false });

// intercept request
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}
