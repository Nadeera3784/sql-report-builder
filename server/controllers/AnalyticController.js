const {sequelize}    = require('../models/sequelize');

const Datasets     = require('../services/Datasets');
const AppConstants = require('../constants/AppConstants');


const AnalyticController = {

    async index(request, response, next){
        const organization_id = request.user.org_id;
        Datasets.service.findAll().then(async function(data){
            let query_selection = [];
            for (let i = 0; i < data.length; i++) {
                let organization = organization_id;
                let where_query = '';
                let query = null;
                let compnay_id_field = data[i].query_where.company_field;
                if(data[i].query_where.company_field){
                    if(data[i].query_where.default){
                        where_query += compnay_id_field+'='+organization+ ' AND '+data[i].query_where.default_field;
                    }else{    
                        where_query += compnay_id_field+'='+organization;
                    }
                    if(data[i].query_join !== undefined){
                        query  = await sequelize.query("SELECT "+data[i].query_count.toString()+" FROM "+data[i].table+"  "+data[i].query_join+"  WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
                    }else{
                        query  = await sequelize.query("SELECT "+data[i].query_count.toString()+" FROM "+data[i].table+" WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
                    } 
                    query_selection.push({Dataset: data[i].name, Count: query[0].number_of_records, Id : data[i]._id});
                }
            }
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "The DataSets has been fetch successfully",
                data : query_selection
           });
        }).catch(function(error){
            console.log(error);
            response.status(400).json({
                type: AppConstants.RESPONSE_ERROR,
                message: "Something went wrong please try again",
                data : error
            });
            return;
        });
    },

    async view(request, response, next){
        const organization = request.user.org_id;
        const data_set_id     = request.params.id;
        Datasets.service.findByID(data_set_id).then(async function(document){
            console.log('boom', document.name);
            let where_query = '';
            let query_selection = '';
            let response_labels = [];
            let response_data = [];
            if(document.query_analytic){
                let compnay_id_field = document.query_where.company_field;
                if(document.query_where.default){
                    where_query += compnay_id_field+'='+organization+ ' AND '+document.query_where.default_field+ ' '+document.query_analytic.group;
                }else{    
                    where_query += compnay_id_field+'='+organization+ ' '+document.query_analytic.group;
                }
                query_selection  = await sequelize.query("SELECT "+document.query_analytic.select.toString()+" FROM "+document.table+" WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
                
                for (let a = 0; a < query_selection.length; a++) {
                    response_labels.push(query_selection[a].labels.toUpperCase());
                    response_data.push(query_selection[a].data);
                }
            }
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : "The DataSets has been fetch successfully",
                data : {
                    chart_name   :  document.name,
                    chart_labels :  response_labels,
                    chart_data   :  response_data
                }
           });
        }).catch(function(error){
            console.log(error);
            response.status(400).json({
                type: AppConstants.RESPONSE_ERROR,
                message: "Something went wrong please try again",
                data : error
            });
            return;
        });
    } 
  };
  
  module.exports = AnalyticController;