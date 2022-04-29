const { Route } = require('express');
const express= require('express')

const Router= express.Router();
const passport = require('passport')

const postsApi = require('../../../controller/api/v1/posts_api')

Router.get('/',postsApi.index)
Router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy)

module.exports = Router