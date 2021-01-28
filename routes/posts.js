const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

/**
 * @route POST /api/posts
 * @desc  Create a post
 * @access Private
 */

postRouter.post('/', auth, postController.createPost);
module.exports = postRouter;
