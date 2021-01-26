const loginRouter = require('express').Router();
const loginController = require('../Controller/loginController');
const auth = require('../../../../../middleware/auth');

loginRouter.get('/', auth, loginController.getUsers);
loginRouter.post('/', loginController.authenticateUser);

module.exports = loginRouter;
