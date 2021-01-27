const restRouter = require('express').Router();
//Import Routes
const userRoute = require('./users');
const authRoute = require('./auth');
const profileRoute = require('./profile');
const postRoute = require('./posts');

restRouter.use('/auth', authRoute);
restRouter.use('/profile', profileRoute);
restRouter.use('/posts', postRoute);
restRouter.use('/users', userRoute);

module.exports = restRouter;
