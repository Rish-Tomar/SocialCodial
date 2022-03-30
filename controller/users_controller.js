
const User= require('../model/user')

module.exports.profile= function(req,res){

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function (err,user){
            if(user){
                return res.render('user_profile',{
                    title:'User Profile',
                    user:user
                })
            }
            return res.redirect('/users/sign-in')
        })

    }
    else{
        return res.redirect('/users/sign-in')
    }
}


module.exports.signUp=function(req,res){
    return res.render('users-sign-up',{
        title:'Sign up'
    })
}

module.exports.signIn=function(req,res){
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
    //find user

    User.findOne({email:req.body.email}, function(err,user)
    {
        if(err){  console.log("error find one"); return; }

        if(user)
        {
            //handle password not match
            if(user.password!= req.body.password)
            {
                return res.redirect('back')
            }

            //handle sessison creation
           
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
        }
        else{
            //handle user not found
            return res.redirect('back')
        }
    }
)}