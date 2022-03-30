const express= require('express')

const Router= express.Router();
const homeController = require('../controller/home_controller')

Router.get('/',homeController.home)
Router.use('/users',require('./users'))

module.exports=Router;