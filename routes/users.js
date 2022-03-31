const express= require('express')
const Router= express.Router();

const passport = require('passport')


const usersController = require('../controller/users_controller')

Router.get('/profile',usersController.profile)
Router.get('/sign-up',usersController.signUp)
Router.get('/sign-in',usersController.signIn)
Router.post('/create',usersController.create)


Router.post('/create-session',/*middleware*/ passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession)


module.exports = Router