// /**
//  * Login
//  */
// const jwt = require('jsonwebtoken');
// const { loginValidation } = require('../../../Validations/User/authValidation');
// const comparePassword = require('../Services/comparePassword');
// const { emailExists } = require('../Service/emailExist');

// module.exports = {
//   async authenticateUser(req, res) {
//     /**
//      * Validate User before forwarding
//      */

//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     // Checking if Email already exists
//     const user = await emailExists(req.body.email);
//     if (user === false)
//       return res.status(400).send('Incorrect Email or Password');

//     // Checking if password is correct
//     const checkPassword = await comparePassword(req.body.password, user);
//     console.log(checkPassword);
//     if (!checkPassword)
//       return res.status(400).send('Invalid Email or Password');

//     /**
//      * Authenticating User & Assigning Token
//      */
//     const token = jwt.sign(
//       {
//         _id: user._id,
//       },
//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: '2h',
//       }
//     );
//     res.header('auth-token', token).send(token);
//   },
// };
