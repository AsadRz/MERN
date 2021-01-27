const {
  getCurrentProfile,
  createOrUpdateProfile,
  getUserProfiles,
} = require('../services/profileServices');
const { profileValidation } = require('../Validations/profileValidation');

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

    profileFields.user = req.user._id;
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
    const profile = await getUserProfiles();
    if (!profile) res.status(400).send('Profiles not found');
    res.json(profile);
  },
};
