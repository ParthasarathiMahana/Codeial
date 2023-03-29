const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post : post
                },
                message : 'post created'
            });
        }
        req.flash('success', 'post created successfully');

        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Error creating post');
        return;
    }

}


module.exports.destroy = async function(req, res){
    try {
        let post=await Post.findById(req.params.id);

        if(post.user == req.user.id)
        {
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully."
                })
            }

            req.flash('success', 'post deleted successfully');

            return res.redirect('back');
        }
        else{
            req.flash('error', 'you can not delete the post');
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error", error);
        return;
    }
    
}