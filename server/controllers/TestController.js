const AppConstants = require('../constants/AppConstants');

const Datasets          = require('../services/Datasets');
const CustomReport      = require('../services/CustomReport');
const ScheduleReport    = require('../services/ScheduleReport');

const AppController = {

    async reset(request, response, next){
       await Datasets.service.deleteMany({});
       await CustomReport.service.deleteMany({});
       await ScheduleReport.service.deleteMany({});
       return response.status(200).json({
         type: AppConstants.RESPONSE_SUCCESS,
         message : "Custom report has been created successfully",
      });
    }  
    
  };
  
  module.exports = AppController;