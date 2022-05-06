const Like = require('../model/like.js')
const Post = require('../model/post')
const Comment = require('../model/comment')


module.exports.toggleLike = async (req,res)=>{
    try{
        let likable;
        let deleted = false

        if(req.query.type =='Post'){
            likable = await Post.findById(req.query.id).populate('likes')
        }else{
            likable = await Comment.findById(req.query.id).populate('likes')
        }

        let existingLike = await Like.findOne({
            likable:req.query.id,
            onModel:req.query.type,
            user:req.user.id
        })

        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save()
            
            existingLike.remove()
            deleted = true
        
        }else{
            let newLike = await Like.create({
                user:req.user.id,
                likable:req.query.id,
                onModel:req.query.type
            })

            likable.likes.push(newLike._id)
            likable.save()

        }

        return res.json(200, {
            message:'Request Successful',
            data:{
                deleted:deleted
            }
        })

    }catch(err){
        if(err){
            return res.status(500).json({
                message:"Internal server error"
            })
        }

    }
}
