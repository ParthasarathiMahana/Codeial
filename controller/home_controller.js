const Post = require('../models/posts');
const User = require('../models/userModel');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('psm', 369);
    // Post.find({}, function(err, posts){
    //     return res.render('home',{title: "Home", posts:posts});
    // });

    // Populate the user of each post
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            User.find({}, function (err, users) {
                return res.render('home.ejs',
                    {
                        title: "Home",
                        posts: posts,
                        all_users: users
                    }
                );
            })
        });
}