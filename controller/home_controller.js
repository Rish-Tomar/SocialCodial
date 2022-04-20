const Post = require('../model/post')

module.exports.home= function(req,res){
 
   Post.find({}, function (err,posts){
       console.log(posts.content)
    return res.render('home',{
        title:'home page',
        posts:posts
   })  
 
  
})}