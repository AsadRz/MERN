const User = require('../models/User');
const Profile = require('../models/Profile');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const getProfileById = async (id) => {
  return await Profile.findOne({ user: id }).populate('user', [
    'name',
    'avatar',
  ]);
};

/**
 *
 * @param {*} id
 * @description req.user.id (as an param in this function)
 */
const getUserById = async (id) => {
  return await Profile.findOne({ user: id }).populate('user', [
    'name',
    'avatar',
  ]);
};

/**
 *
 * @param {*} data
 * @description req.user.id, set includes req.body,new=true
 */
const updateExistingProfile = async (data) => {
  return await Profile.findOneAndUpdate(data);
};

/**
 *
 * @param {*} data
 * @description data as an profileFields
 */

const createUserProfile = async (data) => {
  const profile = new Profile(data);
  return await profile.save();
};

module.exports.getProfileById = getProfileById;
module.exports.getUserById = getUserById;
module.exports.updateExistingProfile = updateExistingProfile;
module.exports.createUserProfile = createUserProfile;
