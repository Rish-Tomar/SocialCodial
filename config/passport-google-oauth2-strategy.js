const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')

const User = require('../model/user')




passport.use(new googleStrategy({
    clientID:"636287277493-19vvipstmtujc8aatmotc78h42m2gclv.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy',err);return}

            console.log(profile)

            if(user){
                return done(null,user)
            }
            else
            {
                User.create(
                    {
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')
                    },
                    function(err,user)
                    {
                        if(err){console.log("errror in creating user",err);
                        return
                      }
                      return done(null,user)

                })

            }
        })
    }
))



module.exports = passport
