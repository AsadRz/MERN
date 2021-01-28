//Validation
const Joi = require('joi');

/**
 * experienceValidation Function that validates profiles request
 * @param {*} data req.body
 */
const experienceValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    from: Joi.string().required(),
    location: Joi.string(),
    current: Joi.string(),
    description: Joi.string(),
    to: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.experienceValidation = experienceValidation;
