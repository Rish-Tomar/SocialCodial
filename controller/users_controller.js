
const { redirect } = require('express/lib/response')
const User= require('../model/user')

module.exports.profile= function(req,res){

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        })
    })
    // return res.render('user_profile',{
    //     title:'User Profile'
    // })
}
module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back')
        })
    }else{
        return res.status(401).send('Unauthorised')
    }
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
    req.flash('success','logged in successfully')
    return res.redirect('/')
    // req.flash('success','logged in successfully')
}


module.exports.destroySession=function(req,res){

    req.logout() //function by passport.js library

    req.flash('success','loggedout successfully')

    return res.redirect('/')
}