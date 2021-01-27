const express = require('express');
const connectDB = require('./config/db');
const app = express();
const restRouter = require('./routes');
const PORT = process.env.PORT || 5000;

//Connect Database
connectDB();

//Middle-wares used as bodyParser
app.use(express.json({ extended: false }));

//Routes Middle-wares
app.use('/api', restRouter);

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
