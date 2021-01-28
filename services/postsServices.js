const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * @desc get User for token
 * @param {req.user.id} id
 * @param {req.body.text} text
 */

const getUserandCreatePost = async (id, text) => {
  const user = await User.findById(id).select('-password');

  const newPost = new Post({
    text,
    name: user.name,
    avatar: user.avatar,
    user: id,
  });

  const post = await newPost.save();
  if (!post) {
    return false;
  }
  return post;
};

const getAllPosts = async () => {
  const posts = await Post.find().sort({ date: -1 });
  if (!posts) return false;
  return posts;
};

/**
 *
 * @param {req.params.post_id} id
 */
const getSinglePost = async (id) => {
  const post = await Post.findById(id);
  if (!post) return false;
  return post;
};

/**
 *
 * @param {req.params.post_id} id
 */
const deleteSinglePost = async (userID, postID) => {
  console.log(postID);
  const post = await Post.findById(postID);

  if (!post) return false;
  console.log(post);
  if (post.user.toString() !== userID) {
    return res.status(401).send('User Not Authorized');
  }

  await post.remove();
};

module.exports.getUserandCreatePost = getUserandCreatePost;
module.exports.getAllPosts = getAllPosts;
module.exports.getSinglePost = getSinglePost;
module.exports.deleteSinglePost = deleteSinglePost;
