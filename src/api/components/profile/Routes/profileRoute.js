const profileRoute = require('express').Router();
// const profileController = require('../Controller/profileController');

profileRoute.get('/', (req, res) => {
  res.send('Profile Route');
});
module.exports = profileRoute;
