const loginRouter = require('express').Router();
const loginController = require('../Controller/loginController');

loginRouter.get('/', (req, res) => {
  res.send('Auth Route');
});
module.exports = loginRouter;
