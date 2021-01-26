const { userValidation } = require('../../../../../Validations/userValidation');
const gravatar = require('gravatar');
const {
  emailExistsCheck,
  passwordHashing,
  registerUser,
} = require('../Service/service');

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
      /**
       * Validate User before forwarding
       */
      const { error } = userValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      // Checking if Email already exists
      const emailExists = await emailExistsCheck(email);
      if (emailExists) return res.status(400).send('Email Already Exists');

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'retro',
      });

      // Hashing the Password
      const hashedPassword = await passwordHashing(password);

      /**
       * Creating new User
       */
      const data = {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
        avatar,
      };
      const user = await registerUser(data);
      if (user)
        return res
          .status(201)
          .send(`User Created Successfully with id: ${user.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
