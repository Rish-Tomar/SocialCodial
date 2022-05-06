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
       
    jwtKey:process.env.JWTKEY
}


const production = {
    name:'production'
}



module.exports = development