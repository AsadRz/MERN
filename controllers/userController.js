const { userValidation } = require('../Validations/userValidation');
const gravatar = require('gravatar');
const UserRepo = require('../repos/userRepo');
const { passwordHashing, registerUser } = require('../services/userServices');
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

      // Checking if Email already exists
      const emailExists = await UserRepo.findByEmail(email);
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
        name,
        email,
        hashedPassword,
        avatar,
      };
      const user = await registerUser(data);
      if (user) {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get('jwtToken'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
