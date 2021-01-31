const { loginValidation } = require('../Validations/userValidation');
const comparePassword = require('../utils/comparePassword');
const { emailExists } = require('../utils/emailExist');
const { getCurrentUser } = require('../services/authServices');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
  async getUser(req, res) {
    try {
      const users = await getCurrentUser(req.user.id); //Calling GetAllUser Service for getting All users
      res.json(users);
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

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, config.get('jwtToken'), {
      expiresIn: '2h',
    });
    res.header('auth-token', token).send(token);
  },
};
