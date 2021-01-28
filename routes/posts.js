const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

/**
 * @route POST /api/posts
 * @desc  Create a post
 * @access Private
 */

postRouter.post('/', auth, postController.createPost);

/**
 * @route GET /api/posts
 * @desc  GET all posts
 * @access Private
 */

postRouter.get('/', auth, postController.getPosts);

module.exports = postRouter;
