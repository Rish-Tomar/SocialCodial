
const { redirect } = require('express/lib/response')
const User= require('../model/user')

module.exports.profile= function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}


module.exports.signUp=function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    
    return res.render('users-sign-up',{
        title:'Sign up'
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')

    }
    return res.render('users-sign-in',{
        title:'Sign in '
    })
}

module.exports.create = function(req,res){
    console.log(req.body)
    if(req.body.password != req.body.confirm_password)
    {
        console.log('password do-not match')
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error occured')
            return res.redirect('back')
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    alert('error')
                    console.log('error creating user');
                    return 
                }
                console.log('created')
                return res.redirect('/users/sign-in')
            })
        }
        else{
                return res.redirect('back')
            }
              
    })
}


module.exports.createSession = function(req,res){
    return res.redirect('/users/profile')
}


module.exports.destroySession=function(req,res){

    req.logout() //function by passport.js library



    return res.redirect('/')
}