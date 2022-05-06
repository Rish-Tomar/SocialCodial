//using .env file
require('dotenv').config()

const express = require('express')
const env= require('./config/environment')
const morgan = require('morgan')
const app= express()
const port = 8000;
const db = require('./config/mongoose')
const expressLayouts= require('express-ejs-layouts')

//use for session cookie
const session =require('express-session')

//all passport related strategies
const passport = require('passport')
const passportLocal= require('./config/passport-jwt-strategy');
const passportJwt= require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')

const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')
const sassMiddleware=require('node-sass-middleware')
const flash = require('connect-flash')
const customMware= require('./config/middleware');
const { constants } = require('crypto');
const path=require('path')

//setting up chat server
// const chatServer = require('http').Server(app)
// const chatSocket = require('./config/chat_sockets').chatSockets(chatServer)
// chatServer.listen(5000);
// console.log('chat server listining on port 5050')

// middlewares

if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }))
}


app.use(express.urlencoded())
app.use(express.static(env.asset_path))
//make uploads path available
app.use('/users/profile/uploads',express.static(__dirname+'/uploads'))
app.use(expressLayouts)
//use our routes
app.use(cookieParser())

app.use(morgan(env.morgan.mode,env.morgan.Option))

//set up the view engines
app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store the session cookie in the db

app.use(session({
    name:'codial',
    //to do ----> change seceret before deployment
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
            mongoUrl:'mongodb://localhost/codeial_development',        
            // mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err ||'Connected to mongostore db');
        }
    )
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(customMware.setFlash)
app.use('/',require('./routes'))



app.listen(process.env.PORT,function(err){
    if(err)
    {
        console.log("Error :",err);
    }
    console.log('Server Is UP and running at port :',process.env.PORT)
})