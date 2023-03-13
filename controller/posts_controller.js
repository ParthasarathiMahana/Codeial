const Post = require('../models/posts');

module.exports.create = function(req, res){
    console.log(req.body);
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log("error while creating post"); return;}
        
        return res.redirect('back');
    });
}