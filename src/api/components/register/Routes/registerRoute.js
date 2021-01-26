const registerRoute = require('express').Router();
// const registerController = require('../Controller/registerController');

registerRoute.get('/', (req, res) => {
  res.send('Register Route');
});
module.exports = registerRoute;
