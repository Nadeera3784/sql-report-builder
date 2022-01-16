require('dotenv').config();

module.exports = {
    app: {
      environment  :  process.env.APP_ENV  || 'development',
      base_url     :  process.env.APP_URL  || 'http://127.0.0.1:3030/',  
      port         :  process.env.APP_PORT || 8080,
      sendgrid_key :  process.env.SENDGRID_KEY,
      jwt_secret   :  process.env.JWT_SECRET
    }
};  
  