const User = require('../models/User');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const getCurrentUserRepo = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

module.exports.getCurrentUserRepo = getCurrentUserRepo;
