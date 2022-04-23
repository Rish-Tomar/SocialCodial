const Post = require('../model/post')
const User = require('../model/user')

module.exports.home= async function(req,res){
 
let posts =await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path:'comment',
    populate:{
        path:'user'
    }
})
   
  let user=await User.find({})

        return res.render('home',{
            title:'home page',
            posts:posts,
            all_users:user
       }) 

}