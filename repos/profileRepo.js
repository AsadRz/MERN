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

/**
 * @description Fetching All Profiles
 */
const findAllProfiles = async () => {
  return await Profile.find().populate('user', ['name', 'avatar']);
};

/**
 * @description Fetching All Profiles By ID
 * @id req.params.user_id
 */
const FetchingProfileById = async (id) => {
  return await Profile.findOne({ user: id }).populate('user', [
    'name',
    'avatar',
  ]);
};

const deleteProfileById = async (id) => {
  /**
   * @todo remove user posts
   */
  /**
   * @todo remove profile
   */

  await Profile.findOneAndRemove({ user: id });
  /**
   * @todo remove user posts
   */
  await User.findOneAndRemove({ _id: id });
};

const addExperience = async (profile) => {
  return await profile.save();
};

const deleteExperience = async (profile) => {
  return await profile.save();
};

const addEducation = async (profile) => {
  return await profile.save();
};

const deleteEducation = async (profile) => {
  return await profile.save();
};

module.exports.getProfileById = getProfileById;
module.exports.getUserById = getUserById;
module.exports.updateExistingProfile = updateExistingProfile;
module.exports.createUserProfile = createUserProfile;
module.exports.findAllProfiles = findAllProfiles;
module.exports.FetchingProfileById = FetchingProfileById;
module.exports.deleteProfileById = deleteProfileById;
module.exports.addExperience = addExperience;
module.exports.deleteExperience = deleteExperience;
module.exports.addEducation = addEducation;
module.exports.deleteEducation = deleteEducation;
