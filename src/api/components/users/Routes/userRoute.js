const userRoute = require('express').Router();
// const userController = require('../Controller/userController');

userRoute.get('/', (req, res) => {
  res.send('User Route');
});
module.exports = userRoute;
