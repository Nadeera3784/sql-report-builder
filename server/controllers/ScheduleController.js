const {validationResult } = require('express-validator');

const ScheduleReport     = require('../services/ScheduleReport');
const AppConstants = require('../constants/AppConstants');

const ScheduleController = {

    async createScheduleReport(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const user_id = request.user.o2o_id;
            const {date, email, custom_report_id} = request.body;
            let Query_builder                   = {};
            Query_builder.user_id               = user_id;
            Query_builder.custom_report_id      = custom_report_id;
            Query_builder.date                  = date;
            if(email != undefined){
                Query_builder.email             = email;
            }
            ScheduleReport.service.create(Query_builder).then(function(data){
                return response.status(200).json({
                     type: AppConstants.RESPONSE_SUCCESS,
                     message : "Custom report has been created successfully",
                     data : data
                });
            }).catch(function (error) {
                response.status(400).json({
                     type: AppConstants.RESPONSE_ERROR,
                     message: "Something went wrong please try again",
                     data : error
                });
                return;
            }); 
        }
    },

    async getAllSchedules (request, response, next){
        const user_id = request.user.o2o_id;
        ScheduleReport.service.findAllWithRelation({'user_id' : user_id}).then(async function(data){
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "The DataSets has been fetch successfully",
                data : data
           });
        }).catch(function (error) {
            response.status(400).json({
                type: AppConstants.RESPONSE_ERROR,
                message: "Something went wrong please try again",
                data : error
            });
            return;
        }); 
    },

    async getSchedulesByUserId (request, response, next){
        const user_id = request.params.id;
        ScheduleReport.service.search({'user_id' : user_id}).then(async function(data){
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "The DataSets has been fetch successfully",
                data : data
           });
        }).catch(function (error) {
            response.status(400).json({
                type: AppConstants.RESPONSE_ERROR,
                message: "Something went wrong please try again",
                data : error
            });
            return;
        }); 
    },

    async deleteMultipleSchedules(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const {schedules_ids} = request.body; 
            for (let index = 0; index < schedules_ids.length; index++) {
                await ScheduleReport.service.deleteOne({_id : schedules_ids[index]});
            }
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "Schedule has been deleted successfully",
                data : {}
           });
        }

    }
}

module.exports = ScheduleController;