//Validation
const Joi = require('joi');

/**
 * postValidation Function that validates post request
 * @param {*} data req.body
 */
const postValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.postValidation = postValidation;
