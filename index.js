const express = require('express');
const connectDB = require('./config/db');
const app = express();
const restRouter = require('./routes/api');
const PORT = process.env.PORT || 5000;

// //Import Routes
// const userRoute = require('./components/users');
// const authRoute = require('./components/auth');
// const profileRoute = require('./components/profile');
// const postRoute = require('./components/posts');
// const registerRoute = require('./components/register');

//Connect Database
connectDB();

//Middle-wares used as bodyParser
app.use(express.json({ extended: false }));

//Routes Middle-wares
app.use('/api', restRouter);

// restRouter.use('/auth/login', authRoute);
// restRouter.use('/auth/register', registerRoute);
// restRouter.use('/profile', profileRoute);
// restRouter.use('/posts', postRoute);
// restRouter.use('/users', userRoute);

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
