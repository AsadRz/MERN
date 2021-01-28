const profileRoute = require('express').Router();
const request = require('request');
const config = require('config');
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

/**
 * @route PUT /api/profiles/experience
 * @desc Adding experience in profiles
 * @access Private
 */

profileRoute.put('/experience', auth, profileController.addExperience);

/**
 * @route DELETE /api/profiles/experience/:exp_id
 * @desc Deleting experience in profiles
 * @access Private
 */

profileRoute.delete(
  '/experience/:exp_id',
  auth,
  profileController.deleteExperience
);

/**
 * @route PUT /api/profiles/education
 * @desc Adding education in profiles
 * @access Private
 */

profileRoute.put('/education', auth, profileController.addEducation);

/**
 * @route DELETE /api/profiles/education/:edu_id
 * @desc Deleting education in profiles
 * @access Private
 */

profileRoute.delete(
  '/education/:edu_id',
  auth,
  profileController.deleteEducation
);

/**
 * @route GET /api/profiles/github/:username
 * @desc Get user repo from github
 * @access Public
 */

profileRoute.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }

      if (response.statusCode !== 200) {
        response.status(404).send('No Github Profile Found');
      }

      res.send(JSON.parse(body));
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = profileRoute;
