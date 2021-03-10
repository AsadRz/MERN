const { userValidation } = require('../Validations/userValidation');
const { signup } = require('../services/userServices');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
      /**
       * Validate User before forwarding
       */
      const { error } = userValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const payload = await signup(name, email, password);

      if (payload?.msg) return res.status(400).send(payload.msg);
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          const responseData = { token };
          res.json({ responseData });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
