const User = require('../models/User');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const getCurrentUser = async (id) => {
  return await User.findById(id).select('-password');
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports.getCurrentUser = getCurrentUser;
module.exports.findByEmail = findByEmail;
