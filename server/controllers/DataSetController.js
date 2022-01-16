const {validationResult } = require('express-validator');

const Datasets     = require('../services/Datasets');
const CustomReport = require('../services/CustomReport');
const ScheduleReport = require('../services/ScheduleReport');
const Organization = require('../services/Organization');
const Events       = require('../services/Events');
const Builder      = require('../services/Builder');
const AppConstants = require('../constants/AppConstants');

const DataSetController = {

    async getAllDataSets (request, response, next){
        const org_id = request.user.org_id;
        Datasets.service.findAll().then(async function(data){
            const events = await Events.service.findAll({where: {org_id: org_id, deleted_at : null}});
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "The DataSets has been fetch successfully",
                data : {
                    datasets : data,
                    events   : events
                }
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

    async getAllCustomReports (request, response, next){
        const organization_id = request.user.org_id;
        CustomReport.service.search({'organization_id' : organization_id}).then(async function(data){
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

    async getCustomReportsByUserId (request, response, next){
        const user_id = request.params.id;
        CustomReport.service.search({'user_id' : user_id}).then(async function(data){
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

    async getDataSetsByID(request, response, next){
        const id = request.params.id;
        Datasets.service.findByID(id).then(function(data){
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

    async getCustomReportByID(request, response, next){
        const id = request.params.id;
        CustomReport.service.findByID(id).then(function(data){
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

    async getEventsByOrganizationID(request, response, next){
        const id = request.params.id;
        Events.service.findAll({where: {org_id: id, deleted_at : null}}).then(function(data){  
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

    async createQuickReport(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const id = request.params.id;
            const dataset = await Datasets.service.findByID(id);
            const {attributes, event, organization, response_type} = request.body;
            let parameters = {};
            parameters.dataset = dataset;
            parameters.attributes = attributes;
            parameters.event = event;
            parameters.organization = organization;
            parameters.response_type = response_type;
            await Builder.QuickReportBuilder(parameters, response);
        }

    },

    async createReportFromCustomReport(request, response, next){
        const id = request.params.id;
        await Builder.CustomReportBuilder(id, response);
    },

    async createCustomReport(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const {name, attributes, dataset_id, event_id} = request.body;
            const user_id                       = request.user.o2o_id;
            const organization_id               = request.user.org_id;
            let Query_builder                   = {};
            Query_builder.user_id               = user_id;
            Query_builder.dataset_id            = dataset_id;
            Query_builder.name                  = name;
            Query_builder.attributes            = attributes;
            if(event_id != undefined){
                Query_builder.event_id          = event_id;
            }
            Query_builder.organization_id          = organization_id;
            
            CustomReport.service.create(Query_builder).then(function(data){
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

    async deleteMultipleCustomReport(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const {custom_report_ids} = request.body; 
            for (let index = 0; index < custom_report_ids.length; index++) {
                const schedule_reports = await ScheduleReport.service.findAll();
                if(schedule_reports){
                    await ScheduleReport.service.deleteOne({custom_report_id : custom_report_ids[index]});
                }
                await CustomReport.service.deleteOne({_id : custom_report_ids[index]});
            }
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "Report has been deleted successfully",
                data : {}
           });
        }

    },

    async generateMagicLinks(request, response, next){
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({
              type : AppConstants.RESPONSE_ERROR,
              message:  'Something went wrong, please try again later',
              data:  errors.array()
            });
            return;
        }else{
            const {organization} = request.body; 
            await Builder.MagicLinksBuilder(organization, response);
        }
    },

    async getNameAvailability(request, response, next){
        const name = decodeURIComponent(request.params.name);
        CustomReport.service.search({'name' : name}).then(function(data){
            if(data.length > 0){
                return response.status(200).json({
                    type: AppConstants.RESPONSE_SUCCESS,
                    message : "The DataSets has been fetch successfully",
                    data : {
                        availability :  false
                    }
               });    
            }else{
                return response.status(200).json({
                    type: AppConstants.RESPONSE_SUCCESS,
                    message : "The DataSets has been fetch successfully",
                    data : {
                        availability :  true
                    }
               });    
            }
        }).catch(function (error) {
            response.status(400).json({
                type: AppConstants.RESPONSE_ERROR,
                message: "Something went wrong please try again",
                data : error
            });
            return;
        }); 
    }
    
    
  };
  
  module.exports = DataSetController;