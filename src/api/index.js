const restRouter = require('express').Router();
//Import Routes
const userRoute = require('./components/users');
const authRoute = require('./components/auth');
const profileRoute = require('./components/profile');
const postRoute = require('./components/posts');

restRouter.use('/auth/login', authRoute);
restRouter.use('/profile', profileRoute);
restRouter.use('/posts', postRoute);
restRouter.use('/users', userRoute);

module.exports = restRouter;
