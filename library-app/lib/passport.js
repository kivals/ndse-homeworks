const passport = require('passport');

const localStrategy = require('./strategies/local');

passport.use('local', localStrategy);

module.exports = passport;
