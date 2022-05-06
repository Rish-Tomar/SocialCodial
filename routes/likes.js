const express= require('express')

const Router= express.Router();
const likesController = require('../controller/likes_controller')

Router.post('/toggle',likesController.toggleLike)

module.exports  =Router