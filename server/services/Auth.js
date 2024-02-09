const jwt          = require("jsonwebtoken");

const config_app   = require('../config/app');
const AppConstants  = require('../constants/AppConstants');

const Auth = module.exports;

Auth.generateToken = function(payload, response){
    const jwt_secret    = config_app.app.jwt_secret || process.env.JWT_SECRET;
    jwt.sign(payload, jwt_secret, {expiresIn: '1h' }, (async function (err, token){
          if (err){
            response.status(400).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data : err
            });
            return;
          }
          return response.status(200).json({
            type : AppConstants.RESPONSE_SUCCESS,
            message:  'You have been logged in successfully',
            data:  {
              accessToken  : token,
            }
          });

        })
    );
}

