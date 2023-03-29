const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/userModel');

passport.use(new googleStrategy({
    clientID: '563217358929-urv99n8qe4difmpomnlgj53ovrq771sd.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google strategy-passport', err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null, user);
        }
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
            function(err, user){
                if(err)
                {
                    console.log('error in google strategy-passport', err);
                    return;
                }
                return done(null, user);
            });
        }
    });
}));

module.exports =passport;