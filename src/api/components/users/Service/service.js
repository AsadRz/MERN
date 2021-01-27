const bcrypt = require('bcryptjs'); //Password Hashing
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../../../../../models/User');

/**
 * Email Exists Service
 * @param {req.body.email} data
 */
const emailExistsCheck = async (email) => {
  // console.log(User.findOne({ email: data }));
  const user = await User.findOne({ email });
  if (user && user !== null) {
    return user;
  } else {
    return false;
  }
};

const passwordHashing = async (data) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(data, salt);
  return hashedPassword;
};

const registerUser = async (data) => {
  const user = new User({
    name: data.name,
    email: data.email,
    password: data.hashedPassword,
    avatar: data.avatar,
  });
  try {
    await user.save();

    const data = {
      status: 200,
      id: user._id,
    };
    return data;
  } catch (err) {
    return err;
  }
};

module.exports.emailExistsCheck = emailExistsCheck;
module.exports.passwordHashing = passwordHashing;
module.exports.registerUser = registerUser;