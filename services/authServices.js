const { getCurrentUserRepo } = require('../repos/authRepo');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const getCurrentUser = (id) => {
  const user = getCurrentUserRepo(id);
  return user;
};

module.exports.getCurrentUser = getCurrentUser;
