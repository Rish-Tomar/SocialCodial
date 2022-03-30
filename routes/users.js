const express= require('express')

const Router= express.Router();

const usersController = require('../controller/users_controller')

Router.get('/profile',usersController.profile)
Router.get('/sign-up',usersController.signUp)
Router.get('/sign-in',usersController.signIn)
Router.post('/create',usersController.create)

module.exports = Router