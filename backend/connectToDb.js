const mongoose = require("mongoose");

const DataBase = async () => {
  const mongoUri = process.env.MONGODB_URL;
  
  if (!mongoUri) {
    console.error('MONGODB_URL is not defined in environment variables');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected!');
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

module.exports = DataBase;
