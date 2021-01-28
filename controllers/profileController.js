const {
  getCurrentProfile,
  createOrUpdateProfile,
  getUserProfiles,
  getUserProfile,
  deleteDetails,
  addUserExperience,
  deleteUserExperience,
  addUserEducation,
  deleteUserEducation,
} = require('../services/profileServices');
const { profileValidation } = require('../Validations/profileValidation');
const { experienceValidation } = require('../Validations/experienceValidation');
const { educationValidation } = require('../Validations/educationValidation');

module.exports = {
  async getProfile(req, res) {
    const profile = await getCurrentProfile(req.user.id);

    if (!profile) {
      return res.status(400).send('No Profile associated with this user');
    }

    res.send(profile);
  },
  async createUserProfile(req, res) {
    /**
     * Validate Profile before Submitting
     */

    const { error } = profileValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

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
    } = req.body;

    //Build Project Object
    const profileFields = {};
    profileFields.user = req.user.id;
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

    // Create or update profile
    const profile = await createOrUpdateProfile(profileFields);
    if (!profile) res.status(500).send('Internal Server Error');
    res.json(profile);
  },

  async getProfiles(req, res) {
    const profiles = await getUserProfiles();
    if (!profiles) res.status(400).send('Profiles not found');
    res.json(profiles);
  },

  async getCurrentUserProfile(req, res) {
    try {
      const profile = await getUserProfile(req.params.user_id);
      if (!profile) res.status(400).send('Profile not found');
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        res.status(400).send('Profile not found');
      }
      res.status(500).send('Internal Server Error');
    }
  },

  async deleteUserDetails(req, res) {
    try {
      deleteDetails(req.user.id);
      res.status(200).send('User Deleted');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  },

  async addExperience(req, res) {
    /**
     * Validate Profile before Submitting
     */
    const { error } = experienceValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await addUserExperience(newExp, req.user._id);
      if (!profile) return res.status(400).send('Profile not found');

      return res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Internal Server Error');
    }
  },
  async deleteExperience(req, res) {
    try {
      const profile = await deleteUserExperience(
        req.user._id,
        req.params.exp_id
      );
      if (!profile) res.status(400).send('Profile Not Found');
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Internal Server Error');
    }
  },

  async addEducation(req, res) {
    /**
     * Validate Profile before Submitting
     */
    const { error } = educationValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await addUserEducation(newEdu, req.user._id);
      if (!profile) return res.status(400).send('Profile not found');

      return res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Internal Server Error');
    }
  },
  async deleteEducation(req, res) {
    try {
      const profile = await deleteUserEducation(
        req.user._id,
        req.params.edu_id
      );
      if (!profile) res.status(400).send('Profile Not Found');
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Internal Server Error');
    }
  },
};
