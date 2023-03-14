const User = require('../models/userModel')

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user',{title: "User page",
        profile_user: user
    });
    })
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.render('/user/profile');
    }
    return res.render('signUp',{title: "User Signup page"});
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.render('user',{title: "User page"});
    }
    return res.render('signIn',{title: "User Signin page"});
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.Confirm_password){
        return res.render('signUp',{title: "User Signin page"});
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err)
        {
            console.log(err);
            return;
        }

        if(!user)
        {
            User.create(req.body, function(err, user){
                if(err)
                {
                    console.log("error while signing up.");
                    return;
                }
                return res.render('signIn', {title: 'signin'});
            })
        }
        else
        {
            return res.render('signUp',{title:'signup'})
        }

    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res)
{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
}