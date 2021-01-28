const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * @desc get User for token
 * @param {req.user.id} id
 * @param {req.body.text} text
 */

const getUserandCreatePost = async (id, text) => {
  try {
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
  } catch (err) {
    console.error(err);
    return false;
  }
};
module.exports.getUserandCreatePost = getUserandCreatePost;
