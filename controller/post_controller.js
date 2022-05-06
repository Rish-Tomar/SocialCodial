const Post = require('../model/post')
const Comment= require('../model/comment')
const Like= require('../model/like')

const { reset } = require('nodemon')

module.exports.create = async function(req,res){
    try{
    let post=await Post.create({
        content:req.body.content,
        user:req.user._id,
    })

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },message:"post created !"
        })
    }
        req.flash('success','Post Published..')
        return res.redirect('back')

    }catch(err){
        req.flash('error','Post not created..')
        return res.redirect('back')       
    }
}


module.exports.destroy = async function(req,res){
   try{
    let post=await Post.findById(req.params.id)

    //.id means converting object to string format
    if(post.user == req.user.id){

        await Like.deleteMany({likable:post,onModel : 'Post'});
        await Like.deleteMany({_id:{$in:post.comments}});
        
        post.remove()

        await Comment.deleteMany({post:req.params.id})

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:params.id
                },message:"post deleted"
            })
        }

        req.flash('success','Post and associated comments deleted')
            return res.redirect('back')

    }else{
        req.flash('error','Posts cannot be deleted')
        return res.redirect('back')
    }

   }catch(err){
       req.flash('error',err)
       return res.redirect('back')
   }
}