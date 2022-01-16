const jwt          = require("jsonwebtoken");

const config_app   = require('../config/app');
const AppConstants = require('../constants/AppConstants');

const tokenGuard = async (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){ 
        response.status(401).json({
            type: AppConstants.RESPONSE_ERROR,
            message : "The security token missing from your request",
            data : ""
        });  
        return;
    }
    const jwt_secret = config_app.app.jwt_secret || process.env.JWT_SECRET;
    jwt.verify(token, jwt_secret, async function(err, user) {  
        if(err){
            response.status(401).json({
                type: AppConstants.RESPONSE_ERROR,
                message : "The security token has been expired",
                data : {}
            });  
            return;
        }
        request.user = user;
        next();
    });
};


module.exports = {
    tokenGuard
};
