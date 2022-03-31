const express = require('express')
const app= express()
const port = 8000;
const db = require('./config/mongoose')
const expressLayouts= require('express-ejs-layouts')

const session =require('express-session')
const passport = require('passport')
const passportLocal= require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');


// middlewares
app.use(expressLayouts)

app.use(express.urlencoded())
//use our routes
app.use(cookieParser())



//set up the view engines
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codial',
    //to do ----> change before deployment
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/',require('./routes'))



app.listen(port,function(err){
    if(err)
    {
        console.log("Error :",err);
    }
    console.log('Server Is UP and running at port :',port)
})