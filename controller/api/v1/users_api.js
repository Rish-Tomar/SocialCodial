const User = require('../../../model/user')
const jwt = require('jsonwebtoken')
const env = require('../../../config/environment')
module.exports.createSession = async function(req,res){
    
    try{
        let user = await User.findOne({email:req.body.email})

        if(!user || user.password!=req.body.password){
            return res.status(422).json({
                message:"Invalid username or password"
            })
        }
        return res.status(200).json({
            message:"sign in successfull,here is your token",
            data:{
                token:jwt.sign(user.toJSON(),env.jwtKey,{expiresIn:100000})
            }
        })

    }catch(err){
        console.log('errro',err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
    
    
}