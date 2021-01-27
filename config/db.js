const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //Getting DB connectionString from string defined in default.json

const connectDB = async () => {
  try {
    mongoose.set('useFindAndModify', false); // to use findOneandUpdate() we need to set it to false
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }); //connect returns promise so we should implement it asynchronously
    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
