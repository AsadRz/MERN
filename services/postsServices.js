const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const PostRepo = require('../repos/postRepo');
/**
 * @desc get User for token
 * @param {req.user.id} id
 * @param {req.body.text} text
 */

const getUserandCreatePost = async (id, text) => {
  const user = await PostRepo.getUserById(id);

  const newPost = new Post({
    text,
    name: user.name,
    avatar: user.avatar,
    user: id,
  });

  return await PostRepo.savePost(newPost);
};

const getAllPosts = async () => {
  return await PostRepo.findAllPosts();
};

/**
 *
 * @param {req.params.post_id} id
 */
const getSinglePost = async (id) => {
  return await PostRepo.getPostById(id);
};

/**
 *
 * @param {req.params.post_id} id
 */
const deleteSinglePost = async (userID, postID) => {
  const post = await Post.findById(postID);
  if (post.user.toString() !== userID) {
    return res.status(401).send('User Not Authorized');
  }

  await post.remove();
};

module.exports.getUserandCreatePost = getUserandCreatePost;
module.exports.getAllPosts = getAllPosts;
module.exports.getSinglePost = getSinglePost;
module.exports.deleteSinglePost = deleteSinglePost;
