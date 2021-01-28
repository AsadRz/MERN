const {
  getUserandCreatePost,
  getAllPosts,
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
      if (!posts) return res.status(400).send('No Posts Found');
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },
};
