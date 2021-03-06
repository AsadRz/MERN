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
    try {
      const profile = await getCurrentProfile(req.user.id);

      if (!profile) {
        return res.status(400).send('No Profile associated with this user');
      }

      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },
  async createUserProfile(req, res) {
    /**
     * Validate Profile before Submitting
     */

    try {
      const { error } = profileValidation(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      const profile = await createOrUpdateProfile(req.user.id, req.body);
      if (!profile) {
        return res.status(400).send('No Profile associated with this user');
      }
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  async getProfiles(req, res) {
    try {
      const profiles = await getUserProfiles();
      if (!profiles) res.status(400).send('Profiles not found');
      res.json(profiles);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
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

    try {
      const profile = await addUserExperience(req.user.id, req.body);
      if (!profile) return res.status(400).send('Profile not found');

      res.json({ profile });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  },
  async deleteExperience(req, res) {
    try {
      const profile = await deleteUserExperience(
        req.user.id,
        req.params.exp_id
      );
      if (!profile) res.status(400).send('Profile Not Found');
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  async addEducation(req, res) {
    try {
      /**
       * Validate Profile before Submitting
       */
      const { error } = educationValidation(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      const profile = await addUserEducation(req.user.id, req.body);
      if (!profile) return res.status(400).send('Profile not found');

      res.json({ profile });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  },
  async deleteEducation(req, res) {
    try {
      const profile = await deleteUserEducation(req.user.id, req.params.edu_id);
      if (!profile) res.status(400).send('Profile Not Found');
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },
};
