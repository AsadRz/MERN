const {
  getUserandCreatePost,
  getAllPosts,
  getSinglePost,
  deleteSinglePost,
} = require('../services/postsServices');
const { postValidation } = require('../Validations/postValidation');

module.exports = {
  /**
   * @Description Creating Post Function
   */
  async createPost(req, res) {
    try {
      /**
       * Validate Post before Submitting
       */
      const { error } = postValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      /**
       * get User First in order to get name and avatar and after finding creating posts
       */

      const post = await getUserandCreatePost(req.user.id, req.body.text);
      if (!post) return res.status(400).send('Post Not Created');
      res.send(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  /**
   * @Description Getting All Posts
   */
  async getPosts(req, res) {
    try {
      const posts = await getAllPosts();
      if (!posts) return res.status(404).send('No Posts Found');
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  /**
   * @Description Getting Post by id
   */
  async getPost(req, res) {
    try {
      /**
       * @req.params.post_id = post_id
       */
      const post = await getSinglePost(req.params.post_id);
      if (!post) return res.status(404).send('No Posts Found By this id');
      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).send('No Posts Found');
      }
      res.status(500).send('Internal Server Error');
    }
  },

  /**
   * @Description Deleting Post by id
   */
  async deletePost(req, res) {
    try {
      /**
       * @req.params.post_id = post_id
       */
      const post = await deleteSinglePost(req.user.id, req.params.post_id);
      if (!post) return res.status(404).send('Post Not Found');
      res.send('Post Successfully Deleted');
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).send('No Posts Found');
      }
      res.status(500).send('Internal Server Error');
    }
  },
};
