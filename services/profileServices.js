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
  ProfileRepo.deleteProfileById(id);
};

const addUserExperience = async (id, body) => {
  const profile = await ProfileRepo.getProfileById(id);
  const { title, company, location, from, to, current, description } = body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  profile.experience.unshift(newExp);
  return await ProfileRepo.addExperience(profile);
};

const deleteUserExperience = async (id, expId) => {
  const profile = await ProfileRepo.getProfileById(id);
  //Get Remove Index

  if (profile) {
    const removedIndex = profile.experience
      .map((item) => item.id)
      .indexOf(expId);
    // console.log('----------- Removed Index ----------', removedIndex);

    profile.experience.splice(removedIndex, 1);

    return await ProfileRepo.deleteExperience(profile);
  }
};

const addUserEducation = async (id, body) => {
  const profile = await Profile.findOne({ user: id });
  const { school, degree, fieldofstudy, from, to, current, description } = body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  profile.education.unshift(newEdu);
  return await ProfileRepo.addEducation(profile);
};

const deleteUserEducation = async (id, eduId) => {
  const profile = await ProfileRepo.getProfileById(id);
  //Get Remove Index

  if (profile) {
    const removedIndex = profile.education
      .map((item) => item.id)
      .indexOf(eduId);
    // console.log('----------- Removed Index ----------', removedIndex);

    profile.education.splice(removedIndex, 1);

    return await ProfileRepo.deleteEducation(profile);
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
