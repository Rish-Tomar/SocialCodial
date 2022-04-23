const Post = require('../model/post')
const User = require('../model/user')

// module.exports.home=function(req,res){
 
//    Post.find({}, function (err,posts){
//        console.log(posts.content)
//     return res.render('home',{
//         title:'home page',
//         posts:posts
//    })  

//populate user of each post

//    Post.find({}).populate('user').exec(function(err,posts){
//     return res.render('home',{
//         title:'home page',
//         posts:posts
//    })  


// Post.find({})
// .populate('user')
// .populate({
//     path:'comment',
//     populate:{
//         path:'user'
//     }
// })
// .exec(function(err,posts){
    
//     User.find({},function(err,user){
//         return res.render('home',{
//             title:'home page',
//             posts:posts,
//             all_users:user
//        }) 

//     })

    
 
  
// })}



//making async function
module.exports.home=async function(req,res){
try{
    let posts =await Post.find({})
.populate('user')
.populate({
    path:'comment',
    populate:{
        path:'user'
    }
})

  let users = await User.find({})  
  
  return res.render('home',{
    title:'home page',
    posts:posts,
    all_users:users})

}catch(err){
    console.log('ERRor...',err)
    return
}
    
}