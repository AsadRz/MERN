//Validation
const Joi = require('joi');

/**
 * profileValidation Function that validates profiles request
 * @param {*} data req.body
 */
const profileValidation = (data) => {
  const schema = Joi.object({
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    bio: Joi.string(),
    githubusername: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
    youtube: Joi.string(),
    status: Joi.string().required(),
    skills: Joi.required(),
  });

  return schema.validate(data);
};

module.exports.profileValidation = profileValidation;
