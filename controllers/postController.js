const { getUserandCreatePost } = require('../services/postsServices');
const { postValidation } = require('../Validations/postValidation');

module.exports = {
  async createPost(req, res) {
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
  },
};
