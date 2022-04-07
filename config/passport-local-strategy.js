const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){ //done is the inbuilt function
     
    
    //finding user and establishing identity
     User.findOne({email:email},function(err,user){
         if(err){ console.log('error in finding'); 
                  return done(err)
                }
        if(!user || user.password !=password){
            console.log('Invalid User');
            return done(null,false); //  first argument is for error if any, null means no error second argument says 
                                     //  authentication not done         
        }

        return done(null,user)
     })
}
))


//serializze the user to decide which key to keep in cookie
passport.serializeUser(function(user,done){
    done(null,user.id); 
})

//decerializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){ console.log('error in finding'); 
                  return done(err)
                }
        return done(null,user)
    })
})

//checking user is authenticated or not
passport.checkAuthentication=function(req, res, next){
    //if user is signed in then pass request to next function that is user controller next function
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in, in that case 
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the 
        //locals for the views 
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport

