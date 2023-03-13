const Post = require('../models/posts');

module.exports.home = function(req, res)
{
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
// return res.render('home', {
//     title: "Codeial | Home",
//     posts:  posts
    
// });
.exec(function(err, posts){
        return res.render('home',{title: "Home", posts:posts});
    });
}