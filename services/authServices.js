const AuthRepo = require('../repos/authRepo');
const comparePassword = require('../utils/comparePassword');
const config = require('config');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const getCurrentUser = (id) => {
  const user = AuthRepo.getCurrentUserRepo(id);
  return user;
};

/**
 *
 * @param {*} email
 * @param {*} password
 * @description req.body.email && req.body.password
 */

const login = async (email, password) => {
  // Checking if Email already exists

  const user = await AuthRepo.findByEmail(email);
  if (!user) return { msg: 'Incorrect Email or Password' };

  // Checking if password is correct
  const checkPassword = await comparePassword(password, user);

  if (!checkPassword) return { msg: 'Invalid Email or Password' };

  /**
   * Authenticating User & Assigning Token
   */

  const payload = {
    user: {
      id: user.id,
      email,
      name: user.name,
    },
  };
  const token = jwt.sign(payload, config.get('jwtToken'), {
    expiresIn: '2h',
  });

  return {
    token,
    success: true,
    payload,
  };
};

module.exports.getCurrentUser = getCurrentUser;
module.exports.login = login;
