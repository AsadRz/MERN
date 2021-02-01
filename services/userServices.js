const bcrypt = require('bcryptjs'); //Password Hashing
const UserRepo = require('../repos/userRepo');
const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const signup = async (name, email, password) => {
  // Checking if Email already exists
  const emailExists = await UserRepo.findByEmail(email);
  if (emailExists) return { msg: 'Email Already Exists' };

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'retro',
  });

  // Hashing the Password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  /**
   * Creating new User
   */
  const newUserData = {
    name,
    email,
    hashedPassword,
    avatar,
  };

  const user = await UserRepo.saveUser(newUserData);

  if (user) {
    const payload = {
      user: {
        id: user.id,
        status: user.status,
      },
    };
    let token = '';
    jwt.sign(
      payload,
      config.get('jwtToken'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        token = token;
      }
    );
    const responseData = { token, payload };
    return responseData;
  }
};

module.exports.signup = signup;
