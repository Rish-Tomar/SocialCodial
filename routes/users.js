const express= require('express')
const Router= express.Router();

const passport = require('passport')


const usersController = require('../controller/users_controller')

Router.get('/profile/:id',passport.checkAuthentication,usersController.profile)
Router.post('/update/:id',passport.checkAuthentication,usersController.update)
Router.get('/sign-up',usersController.signUp)
Router.get('/sign-in',usersController.signIn)
Router.post('/create',usersController.create)


Router.post('/create-session',/*middleware*/ passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession)

Router.get('/sign-out',usersController.destroySession)
module.exports = Router