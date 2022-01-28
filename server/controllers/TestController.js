const mongoose          = require('mongoose');

const AppConstants      = require('../constants/AppConstants');
const Datasets          = require('../services/Datasets');
const CustomReport      = require('../services/CustomReport');
const ScheduleReport    = require('../services/ScheduleReport');
const config_database   = require('../config/mongo');
  
const AppController = {

    async reset(request, response, next){
       await Datasets.service.deleteMany({});
       await CustomReport.service.deleteMany({});
       await ScheduleReport.service.deleteMany({});
       return response.status(200).json({
         type: AppConstants.RESPONSE_SUCCESS,
         message : "Custom report has been created successfully",
      });
    },
    
    databaseCheck(request, response, next){
      mongoose.connect(config_database.database.mongodb.host, {useNewUrlParser: true, ssl: true, sslValidate: false, sslCA: `rds-combined-ca-bundle.pem`}).then(function(client){
        console.log('Mongoose connected:');
      }).catch(function(error){
        console.log('Mongoose connection URI error:',  error);
      }); 
    }
    
  };
  
  module.exports = AppController;