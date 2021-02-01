const { loginValidation } = require('../Validations/userValidation');

const { getCurrentUser, login } = require('../services/authServices');

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
    try {
      /**
       * Validate User before forwarding
       */

      const { email, password } = req.body;
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      // Call login Service
      const data = await login(email, password);
      if (data.msg) return res.status(400).send(data.msg);

      const { token, success, payload } = data;
      res.header('auth-token', token).send({ token, success, payload });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },
};
