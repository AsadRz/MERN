const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

/**
 *
 * @param {*} id
 * @description req.user.id (as an param in this function)
 */
const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

const savePost = async (post) => {
  return await post.save();
};

const findAllPosts = async () => {
  return await Post.find().sort({ date: -1 });
};

const getPostById = async (id) => {
  const user = await Post.findById(id);
  return user;
};

const addLike = async (post) => {
  return await post.save();
};
module.exports.getUserById = getUserById;
module.exports.savePost = savePost;
module.exports.findAllPosts = findAllPosts;
module.exports.getPostById = getPostById;
module.exports.addLike = addLike;
