const Profile = require('../models/Profile');
const User = require('../models/User');
const ProfileRepo = require('../repos/ProfileRepo');

/**
 * @desc Getting Current User Profile After verifying the token and populating name and avatar from user model
 * @param {*req.user.id} id
 */

const getCurrentProfile = async (id) => {
  return await ProfileRepo.getProfileById(id);
};

/**
 * @desc Creating or Updating User Profile
 * @param {*req.user.id} body = profileFields
 */

const createOrUpdateProfile = async (id, body) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    linkedin,
    facebook,
    twitter,
    instagram,
  } = body;

  //Build Project Object
  const profileFields = {};
  profileFields.user = id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  //Checking if we have already Created User Profile
  let profile = await ProfileRepo.getUserById(id);

  if (profile) {
    //if Profile is already there then Update Profile

    profile = await ProfileRepo.updateExistingProfile(
      ({ user: id }, { $set: profileFields }, { new: true })
    );
    return profile;
  }

  //Create
  profile = ProfileRepo.createUserProfile(profileFields);
  return profile;
};

/**
 * @desc Fetching all user Profiles
 */

const getUserProfiles = async () => {
  return await ProfileRepo.findAllProfiles();
};

/**
 * @desc Fetching user profile of current Id
 */

const getUserProfile = async (id) => {
  return await ProfileRepo.FetchingProfileById(id);
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

const addUserEducation = async (data, id) => {
  try {
    const profile = await Profile.findOne({ user: id });
    profile.education.unshift(data);
    await profile.save();
    return profile;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const deleteUserEducation = async (id, eduId) => {
  try {
    const profile = await Profile.findOne({ user: id });
    //Get Remove Index

    if (!profile) {
      return false;
    }

    // console.log('----------- Profile ----------', profile.experience);
    const removedIndex = profile.education
      .map((item) => item.id)
      .indexOf(eduId);
    // console.log('----------- Removed Index ----------', removedIndex);

    profile.education.splice(removedIndex, 1);
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
module.exports.addUserEducation = addUserEducation;
module.exports.deleteUserEducation = deleteUserEducation;
