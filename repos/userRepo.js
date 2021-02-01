const User = require('../models/User');

/**
 *
 * @param {*} id
 * @description req.user.id as an param in this function
 */
const saveUser = async ({ name, email, hashedPassword, avatar }) => {
  const user = new User({
    name,
    email,
    password: hashedPassword,
    avatar,
  });

  await user.save();

  const data = {
    status: 200,
    id: user._id,
  };

  return data;
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports.saveUser = saveUser;
module.exports.findByEmail = findByEmail;
