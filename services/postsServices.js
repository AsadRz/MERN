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

const addingLikeToPostByID = async (userId, id) => {
  const post = await PostRepo.getPostById(id);

  if (post.likes.filter((like) => like.user.toString() === userId).length > 0) {
    return { msg: 'Already Liked By the User' };
  }

  post.likes.unshift({ user: userId });
  return await PostRepo.addLike(post);
  //Check if post has already been liked by the same user
};

module.exports.getUserandCreatePost = getUserandCreatePost;
module.exports.getAllPosts = getAllPosts;
module.exports.getSinglePost = getSinglePost;
module.exports.deleteSinglePost = deleteSinglePost;
module.exports.addingLikeToPostByID = addingLikeToPostByID;
