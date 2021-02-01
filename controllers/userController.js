const { userValidation } = require('../Validations/userValidation');
const { signup } = require('../services/userServices');

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
      /**
       * Validate User before forwarding
       */
      const { error } = userValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const data = await signup(name, email, password);
      if (data?.msg) return res.status(400).send(data.msg);
      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
