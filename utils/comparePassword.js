const bcrypt = require('bcryptjs');

const comparePassword = async (password, user) => {
  const ValidPass = await bcrypt.compare(password, user.password);

  if (!ValidPass) return false;
  return ValidPass;
};

module.exports = comparePassword;
