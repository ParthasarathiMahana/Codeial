const Post = require('../models/posts');
const Comment = require('../models/comment');

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


module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log("post could not be found whilw deleting the post");
            return;
        }

        if(post.user == req.user.id)
        {
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}