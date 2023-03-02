const passport  = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

// Authenticating User
passport.use(new localStrategy({usernameField: 'email'},
function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err)
        {
            console.log("Error occured while finding user.");
            return done(err);
        }

        if(!user || user.password != password)
        {
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    });
}
));

// serializeUser : putting user id in session cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializeUser : taking out user info from cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, User){
        if(err){
            console.log('Error infinding user');
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;
