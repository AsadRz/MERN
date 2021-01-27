const profileRoute = require('express').Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

/**
 * @route GET /api/profiles/profile
 * @desc Get current user profile
 * @access Private
 */

profileRoute.get('/profile', auth, profileController.getProfile);

/**
 * @route POST /api/profiles
 * @desc Create or update user profile
 * @access Private
 */

profileRoute.post('/', auth, profileController.createUserProfile);

/**
 * @route Get /api/profiles
 * @desc Get all profiles
 * @access Public
 */

module.exports = profileRoute;
