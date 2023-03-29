const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user', {
            title: "User page",
            profile_user: user
        });
    })
}

module.exports.update = async function(req, res){
    
    if(req.user.id == req.params.id){
        try {
                let user = await User.findByIdAndUpdate(req.params.id);
                User.uploadedAvatar(req, res, function(err){
                    if(err){console.log('multer error:', err);}

                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){


                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                        // saving the path of the uploaded file into the avatar field in the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                })
        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
    }
    else
    {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('/user/profile');
    }
    return res.render('signUp', { title: "User Signup page" });
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('user', { title: "User page" });
    }
    return res.render('signIn', { title: "User Signin page" });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.Confirm_password) {
        return res.render('signUp', { title: "User Signin page" });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("error while signing up.");
                    return;
                }
                return res.render('signIn', { title: 'signin' });
            })
        }
        else {
            return res.render('signUp', { title: 'signup' })
        }

    })
}

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    });
}