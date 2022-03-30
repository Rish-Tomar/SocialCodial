const express = require('express')
const app= express()
const port = 8000;

const cookieParser = require('cookie-parser')
const db = require('./config/mongoose')

const expressLayouts= require('express-ejs-layouts')
// middlewares
app.use(expressLayouts)


app.use(express.urlencoded())

app.use(cookieParser())
//use our routes
app.use('/',require('./routes'))

//set up the view engines
app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port,function(err){
    if(err)
    {
        console.log("Error :",err);
    }
    console.log('Server Is UP and running at port :',port)
})