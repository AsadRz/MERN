//Validation
const Joi = require('joi');

/**
 * educationValidation Function that validates profiles request
 * @param {*} data req.body
 */
const educationValidation = (data) => {
  const schema = Joi.object({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string(),
    current: Joi.bool(),
    description: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.educationValidation = educationValidation;
