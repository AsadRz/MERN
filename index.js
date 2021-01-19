const express = require('express');
const connectDB = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5000;

//Import Routes
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/posts');

//Connect Database
connectDB();

//Middlewares used as bodyParser
app.use(express.json());

app.get('/', (req, res) => res.send(`API Running`));

//Routes Middlewares
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
