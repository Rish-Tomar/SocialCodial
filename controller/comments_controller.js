const { redirect } = require('express/lib/response')
const Comment = require('../model/comment')
const Post = require('../model/post')
const commentsMailer=require('../mailers/comments-mailer')
module.exports.create=async function(req,res){
   try{
     let post = await Post.findById(req.body.post) 
     if(post){
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        })
            

            post.comment.push(comment)
            post.save()
            
            comment = await comment.populate('user','name email')
            commentsMailer.newComment(comment)
           if(req.xhr){

               

               return res.status(200).json({
                   data:{
                       comment:comment
                   },
                   message:'post created'
               })
           }
        req.flash('success','Comment Published')
        res.redirect('/')
    
      }

   } catch(err){
       if(err){
           console.log("error in creating commetn ",err)
       }

   }

}


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user ==req.user.id){

            let postId=comment.post

            comment.remove()

            Post.findByIdAndUpdate(postId, { $pull:{comment :req.params.id}},function(err,post){
                return res.redirect('back')
            })
        }else{
            return res.redirect('back')
        }

    })
}