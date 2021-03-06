const express= require('express')
const Router= express.Router();
const passport=require('passport')

const commentsController = require('../controller/comments_controller')

Router.post('/create',passport.checkAuthentication,commentsController.create)
Router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy)

module.exports=Router