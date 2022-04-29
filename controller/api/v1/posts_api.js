const Post = require('../../../model/post')
const Comment=require('../../../model/comment')
module.exports.index = async function(req,res){

    let posts =await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comment',
        populate:{
            path:'user'
            }
    })

    return res.status(200).json({
        message : "list of posts",
        posts:posts
    })
}


module.exports.destroy = async function(req,res){
    try{
     let post=await Post.findById(req.params.id)
 
     //.id means converting object to string format
     if(post.user == req.user.id){
         post.remove()
 
         await Comment.deleteMany({post:req.params.id})
         return res.json(200,{
                 message:"post and associated comments deleted"
             })
 
     }else{
         return res.status(401).json({
             message:"you cannot delete this post"
         })
     }
 
    }catch(err){
        console.log(err)
        return res.json(500, {
            message:"internal server error"
        })
    }
 }