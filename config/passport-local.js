const passport  = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/userModel');

// Authenticating User
passport.use(new localStrategy({usernameField: 'email',
passReqToCallback: true
},
function(req, email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err)
        {
            req.flash("error", err);
            return done(err);
        }

        if(!user || user.password != password)
        {
            req.flash('error', 'Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    });
}
));

// serializeUser : putting user id in session cookie
passport.serializeUser(function(user, done){
    console.log(user);
    done(null, user.id);
});

// deserializeUser : taking out user info from cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error infinding user');
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next)
{
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
