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

/**
 * @route GET /api/posts/:post_id
 * @desc  GET post by id
 * @access Private
 */

postRouter.get('/:post_id', auth, postController.getPost);

/**
 * @route DELETE /api/posts/:post_id
 * @desc  Delete post by id
 * @access Private
 */

postRouter.delete('/:post_id', auth, postController.deletePost);

/**
 * @route PUT /api/posts/like/:id
 * @desc  PUT like a post
 * @access Private
 */

postRouter.put('/like/:id', auth, postController.addLikeToPost);

module.exports = postRouter;
