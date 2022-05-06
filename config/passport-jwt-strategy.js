const passport = require('passport')
const { ExtractJwt } = require('passport-jwt')

const JWTStrategy = require('passport-jwt').Strategy

const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../model/user')
const env = require('./environment')

let options={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwtKey
}

passport.use(new JWTStrategy(options,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){console,log('error in finding user',err)}

        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
}))


module.exports = passport