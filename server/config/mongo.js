require('dotenv').config();

module.exports = {
    database: {
      mongodb : {
        host: process.env.DB_MONGO_URI,
      }
    }
};
  