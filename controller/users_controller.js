const User = require('../models/userModel')

module.exports.user = function(req, res){
    res.render('user',{title: "User page"});
}

module.exports.signUp = function(req, res){
    return res.render('signUp',{title: "User Signup page"});
}

module.exports.signIn = function(req, res){
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
    // 
}