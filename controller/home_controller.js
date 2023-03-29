const Posts = require('../models/posts');
const User = require('../models/userModel');

module.exports.home = async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            let posts = await Posts.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            })

            let users = await User.find({});

            return res.render('home',{
                title:"Home",
                posts:posts,
                all_users:users
            });
                
        }else{
            return res.redirect('/user/sign-in');
        }
    }
    catch(err){
        return;
    }
}