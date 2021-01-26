/**
 * Login
 */
// const jwt = require('jsonwebtoken');
const User = require('../../../../../models/User');
const {
  loginValidation,
} = require('../../../../../Validations/userValidation');
const comparePassword = require('../Service/comparePassword');
const { emailExists } = require('../Service/emailExist');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
  async getUsers(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status('500').send('Server Error');
    }
  },

  async authenticateUser(req, res) {
    /**
     * Validate User before forwarding
     */

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if Email already exists
    const user = await emailExists(req.body.email);
    if (user === false)
      return res.status(400).send('Incorrect Email or Password');

    // Checking if password is correct
    const checkPassword = await comparePassword(req.body.password, user);

    if (!checkPassword)
      return res.status(400).send('Invalid Email or Password');

    /**
     * Authenticating User & Assigning Token
     */
    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.get('jwtToken'),
      {
        expiresIn: '360000',
      }
    );
    res.header('auth-token', token).send(token);
  },
};
