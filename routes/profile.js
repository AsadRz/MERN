const profileRoute = require('express').Router();
const profileController = require('../controllers/profileController');

profileRoute.get('/', (req, res) => {
  res.send('Profile Route');
});
module.exports = profileRoute;
