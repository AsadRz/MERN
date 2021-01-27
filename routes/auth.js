const loginRouter = require('express').Router();
const authContoller = require('../controllers/authController');
const auth = require('../middleware/auth');

loginRouter.get('/', auth, authContoller.getUsers);
loginRouter.post('/', authContoller.authenticateUser);

module.exports = loginRouter;
