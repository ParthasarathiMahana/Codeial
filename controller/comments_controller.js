const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log("error");
                    return;
                }

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    })
}


module.exports.destroy = function(req,res){

    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment,post;
            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}},
                function(err,post){
                    return res.redirect('back');
                })
        }
        else{
            console.log(Post.findById(req.user)._conditions._id._id);
            return res.redirect('back');
        }
    });
}