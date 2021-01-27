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

profileRoute.get('/', profileController.getProfiles);

/**
 * @route Get /api/profiles/users/:user_id
 * @desc Get userProfile by user_id
 * @access Public
 */

profileRoute.get('/user/:user_id', profileController.getCurrentUserProfile);

/**
 * @route Delete /api/profiles
 * @desc Delete users, profiles and posts
 * @access Private
 */

profileRoute.delete('/', auth, profileController.deleteUserDetails);

module.exports = profileRoute;
