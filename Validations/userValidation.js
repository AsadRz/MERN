//Validation
const Joi = require('joi');

//Schema Validations for all requests

/**
 * RegisterValidation Function that validates register request
 * @param {*} data req.body
 */
const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

/**
 * Login Request Validation Function
 * @param {*} data req.body
 */
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
