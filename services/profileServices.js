const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * @desc Getting Current User Profile After verifying the token and populating name and avatar from user model
 * @param {*req.user.id} id
 */

const getCurrentProfile = async (id) => {
  try {
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      return false;
    }
    return profile;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * @desc Creating or Updating User Profile
 * @param {*req.user.id} data = profileFields
 */

const createOrUpdateProfile = async (data) => {
  try {
    let profile = await Profile.findOne({ user: data.user });

    if (profile) {
      //if Profile is already there then Update Profile

      profile = await Profile.findOneAndUpdate(
        { user: data.user },
        { $set: data },
        { new: true }
      );
      return profile;
    }

    //Create
    profile = new Profile(data);
    await profile.save();
    return profile;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * @desc Fetching all user Profiles
 */

const getUserProfiles = async () => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar']);
  if (!profiles) return false;
  return profiles;
};

/**
 * @desc Fetching user profile of current Id
 */

const getUserProfile = async (id) => {
  const profile = await Profile.findOne({ user: id }).populate('user', [
    'name',
    'avatar',
  ]);

  if (!profile) return false;
  return profile;

  console.error(error.message);
  return false;
};

const deleteDetails = async (id) => {
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

const addUserExperience = async (data, id) => {
  try {
    const profile = await Profile.findOne({ user: id });
    profile.experience.unshift(data);
    await profile.save();
    return profile;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const deleteUserExperience = async (id, expId) => {
  try {
    console.log(id);
    const profile = await Profile.findOne({ user: id });
    //Get Remove Index

    if (!profile) {
      return false;
    }

    // console.log('----------- Profile ----------', profile.experience);
    const removedIndex = profile.experience
      .map((item) => item.id)
      .indexOf(expId);
    // console.log('----------- Removed Index ----------', removedIndex);

    profile.experience.splice(removedIndex, 1);
    await profile.save();
    return profile;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports.getCurrentProfile = getCurrentProfile;
module.exports.createOrUpdateProfile = createOrUpdateProfile;
module.exports.getUserProfiles = getUserProfiles;
module.exports.getUserProfile = getUserProfile;
module.exports.deleteDetails = deleteDetails;
module.exports.addUserExperience = addUserExperience;
module.exports.deleteUserExperience = deleteUserExperience;
