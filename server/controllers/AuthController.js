const {validationResult } = require('express-validator');

const AppConstants  = require('../constants/AppConstants');
const Auth          = require('../services/Auth');

const AuthController = {

    async createToken(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const {o2o_id, org_id} = request.body;
            const payload = {
                'o2o_id' : o2o_id,
                'org_id' : org_id
            };
            Auth.generateToken(payload, response);
        }
    }  
    
  };
  
  module.exports = AuthController;