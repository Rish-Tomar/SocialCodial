const fs = require('fs')
const rfs=require('rotating-file-stream')
const path = require('path')

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
}) 


require('dotenv').config()
const development = {
    name:'development',
    asset_path:process.env.AssetsPath,
    session_cookie_key:process.env.SessionCookie,
    db:process.env.DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.SMTPAuthUser,
            pass:process.env.SMTPAuthPass
            
        }
    },
     
    google_clientID:process.env.googleCid,
    google_clientSecret:process.env.googleClientSecret,
    google_callbackURL:process.env.googleCallBackURL,
       
    jwtKey:process.env.JWTKEY,
    morgan:{
        mode:'dev',
        Option:{
            stream:accessLogStream
        }

    }
}


const production = {
    name:'production',
    asset_path:process.env.AssetsPath,
    session_cookie_key:process.env.SessionCookie,
    db:process.env.DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.SMTPAuthUser,
            pass:process.env.SMTPAuthPass
            
        }
    },
     
    google_clientID:process.env.googleCid,
    google_clientSecret:process.env.googleClientSecret,
    google_callbackURL:process.env.googleCallBackURL,
       
    jwtKey:process.env.JWTKEY,
    morgan:{
        mode:'combined',
        Option:{
            stream:accessLogStream
        }

    }
}



module.exports = development