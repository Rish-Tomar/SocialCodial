const express= require('express')
const Router= express.Router();
const passport=require('passport')

const postsController = require('../controller/post_controller')

Router.post('/create',passport.checkAuthentication,postsController.create)
Router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy)


module.exports=Router