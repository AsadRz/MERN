const { userValidation } = require('../../../../../Validations/userValidation');
const { passwordHashing, registerUser } = require('../Service/service');

module.exports = {
  async registerUser(req, res) {
    /**
     * Validate User before forwarding
     */

    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Hashing the Password
    const hashedPassword = await passwordHashing(req.body.password);

    /**
     * Creating new User
     */
    const data = {
      name: req.body.name,
      email: req.body.email,
      hashedPassword: hashedPassword,
    };
    const user = await registerUser(data);
    if (user)
      return res
        .status(201)
        .send(`User Created Successfully with id: ${user.id}`);
  },
};
