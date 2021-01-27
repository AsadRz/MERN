const bcrypt = require('bcryptjs'); //Password Hashing
const User = require('../models/User');

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

module.exports.passwordHashing = passwordHashing;
module.exports.registerUser = registerUser;
