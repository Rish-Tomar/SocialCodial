const express= require('express')
const Router= express.Router();

const postsController = require('../controller/post_controller')

Router.post('/create',postsController.create)


module.exports=Router