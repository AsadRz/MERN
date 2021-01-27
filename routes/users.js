const userRoute = require('express').Router();
const userController = require('../controllers/userController');

/**
 *  @route POST api/users
 *  @desc Register User
 *  @access Public
 */

userRoute.post('/', userController.registerUser);
module.exports = userRoute;
