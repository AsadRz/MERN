const User = require('../models/User');

const emailExists = async (data, res) => {
  const user = await User.findOne({ email: data });

  if (user && user !== null) {
    return user;
  } else {
    return false;
  }
};

module.exports.emailExists = emailExists;
