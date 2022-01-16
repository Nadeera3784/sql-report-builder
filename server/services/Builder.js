const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const md5             = require('md5');
const {Op}            = require('sequelize');

const CustomReport    = require('../services/CustomReport');
const {sequelize}    = require('../models/sequelize');
const People          = require('../services/People');
const UserToken       = require('../services/UserToken');
const Domain          = require('../services/Domain');
const AppConstants    = require('../constants/AppConstants');

module.exports.QuickReportBuilder = async function (parameters, response) { 
    let header_attributes = [];
    let selected_attributes = [];
    let query_selection = [];
    let datatable_columns = [];
    let where_query = '';
    let query = null;
    const csvWriter = createCsvWriter({
        path: 'public/report.csv',
        header: header_attributes
    });
    const attributes = parameters.attributes; 
    const dataset    = parameters.dataset; 
    const event      = parameters.event; 
    const organization = parameters.organization; 
    const response_type = parameters.response_type; 
    const query_attribute_list =   dataset.query_select;
    // for (let x = 0; x < attributes.length; x++) {
    //     header_attributes.push({id : attributes[x], title : attributes[x]});
    //     selected_attributes.push(attributes[x]);
    // }
    for (let i = 0; i < attributes.length; i++) {
        header_attributes.push({id : attributes[i], title : attributes[i]});
        selected_attributes.push(attributes[i]);
        datatable_columns.push( {Header: attributes[i], accessor: attributes[i]});
        for (let x = 0; x < query_attribute_list.length; x++) {
            if(query_attribute_list[x].field === attributes[i]){ 
                query_selection.push(query_attribute_list[x].value);
            }
        }
    }
    if(dataset.query_where.company && dataset.query_where.event){
        let compnay_id_field = dataset.query_where.company_field;
        where_query += compnay_id_field+'='+organization;
        if(dataset.query_where.default){
            where_query += ' AND '+dataset.query_where.event_field+'='  +event.id+ ' AND '+dataset.query_where.default_field;
        }else{
            where_query += ' AND '+dataset.query_where.event_field+'='  +event.id;
        }
    }
    if(!dataset.query_where.company && dataset.query_where.event){
        let event_field = dataset.query_where.event_field;
        if(dataset.query_where.default){
            where_query += event_field+'='+event.id+ ' AND '+dataset.query_where.default_field;
        }else{
            where_query += event_field+'='+event.id;
        }
    }
    if(dataset.query_where.company && !dataset.query_where.event){
        let compnay_id_field = dataset.query_where.company_field;
        if(dataset.query_where.default){
            where_query += compnay_id_field+'='+organization+ ' AND '+dataset.query_where.default_field;
        }else{    
            where_query += compnay_id_field+'='+organization;
        }
    }
    if(dataset.query_join !== undefined){
        query  = await sequelize.query("SELECT "+query_selection.toString()+" FROM "+dataset.table+"  "+dataset.query_join+"  WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
    }else{
        query  = await sequelize.query("SELECT "+query_selection.toString()+" FROM "+dataset.table+" WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
    }   
    const data_lake = query.map(function(data){
        const dataKeys = Object.keys(data);
        const newData = {}
        for (let i = 0; i < dataKeys.length; i++) {
            if(selected_attributes.indexOf(dataKeys[i]) > -1){
                newData[dataKeys[i]] = data[dataKeys[i]];
            }
        }
        return newData
    });
    if(response_type == AppConstants.RESPONSE_TYPE_TABLE){
        return response.status(200).json({
            type: AppConstants.RESPONSE_SUCCESS,
            message : AppConstants.RESPONSE_TYPE_TABLE,
            data : data_lake
       });   
    }else{
       csvWriter.writeRecords(data_lake).then(function(){
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : AppConstants.RESPONSE_TYPE_DOWNLOAD,
                data : {}
            });     
       }); 
    }
};

module.exports.CustomReportBuilder = async function (id, response=null) { 
    let header_attributes = [];
    let selected_attributes = [];
    let query_selection = [];
    let where_query = '';
    let query = null;
    const csvWriter = createCsvWriter({
        path: 'public/report.csv',
        header: header_attributes
    });
    const custom_report = await CustomReport.service.findByIDWithRelation(id);
    const attributes = custom_report.attributes; 
    const dataset    = custom_report.dataset_id; 
    const event      = custom_report.event_id; 
    const organization = parseInt(custom_report.organization_id); 
    const query_attribute_list =   dataset.query_select;
    for (let i = 0; i < attributes.length; i++) {
        header_attributes.push({id : attributes[i], title : attributes[i]});
        selected_attributes.push(attributes[i]);
        for (let x = 0; x < query_attribute_list.length; x++) {
            if(query_attribute_list[x].field === attributes[i]){ 
                query_selection.push(query_attribute_list[x].value);
            }
        }
    }
    if(dataset.query_where.company && dataset.query_where.event){
        let compnay_id_field = dataset.query_where.company_field;
        where_query += compnay_id_field+'='+organization;
        if(dataset.query_where.default){
            where_query += ' AND '+dataset.query_where.event_field+'='  +event+ ' AND '+dataset.query_where.default_field;
        }else{
            where_query += ' AND '+dataset.query_where.event_field+'='  +event;
        }
    }
    if(!dataset.query_where.company && dataset.query_where.event){
        let event_field = dataset.query_where.event_field;
        if(dataset.query_where.default){
            where_query += event_field+'='+event+ ' AND '+dataset.query_where.default_field;
        }else{
            where_query += event_field+'='+event;
        }
    }
    if(dataset.query_where.company && !dataset.query_where.event){
        let compnay_id_field = dataset.query_where.company_field;
        if(dataset.query_where.default){
            where_query += compnay_id_field+'='+organization+ ' AND '+dataset.query_where.default_field;
        }else{    
            where_query += compnay_id_field+'='+organization;
        }
    }
    if(dataset.query_join !== undefined){
        query  = await sequelize.query("SELECT "+query_selection.toString()+" FROM "+dataset.table+"  "+dataset.query_join+"  WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
    }else{
        query  = await sequelize.query("SELECT "+query_selection.toString()+" FROM "+dataset.table+" WHERE "+where_query+"",  {raw : true, type: sequelize.QueryTypes.SELECT});
    } 
    const data_lake = query.map(function(data){
        const dataKeys = Object.keys(data);
        const newData = {}
        for (let i = 0; i < dataKeys.length; i++) {
            if(selected_attributes.indexOf(dataKeys[i]) > -1){
                newData[dataKeys[i]] = data[dataKeys[i]];
            }
        }
        return newData
    });
    await csvWriter.writeRecords(data_lake);
    if(response != null){
        return response.status(200).json({
            type: AppConstants.RESPONSE_SUCCESS,
            message : AppConstants.RESPONSE_TYPE_DOWNLOAD,
            data : {}
        });     
    }else{
        return 'public/report.csv';
    }
}

module.exports.MagicLinksBuilder = async function (compnay_id, response) {
    const csvWriter = createCsvWriter({
        path: 'public/report.csv',
        header: [
            {id : 'email', title : 'Email'},
            {id : 'link', title : 'Magic Link'}
        ]
    });

    let data_lake = [];

    People.service.findAll({
            where: {
                company_id: compnay_id, 
                deleted_at: {[Op.eq]: null}
            }, 
            group: ['username']
     }).then(async function(data){
        for (let index = 0; index < data.length; index++) {
            console.log(index);
            const epoch_time = md5(Date.now());
            const token = epoch_time.substr(0, 64);
            const is_exist = await UserToken.service.findOne({where : {'email': data[index].username}});
            if (is_exist){
                await UserToken.service.deleteOne({where : {'id': is_exist.id}});
            }
            let Query_builder                   = {};
            Query_builder.email               = data[index].username;
            Query_builder.token               = token;
            await UserToken.service.create(Query_builder);
            let action = await Domain.service.findOne({where : {'org_id': compnay_id}});
            if(action){
                const link = action.domain+'/auth/confirm?token='+token+'&email='+data[index].username;
                data_lake.push({email : data[index].username, link : link});
            }
        }
        csvWriter.writeRecords(data_lake).then(function(){
            return response.status(200).json({
                type: AppConstants.RESPONSE_SUCCESS,
                message : 'Magic links has been generated',
                data : {}
            });     
        }); 
    }).catch(function(error){
        console.log('boom');
        response.status(400).json({
            type: AppConstants.RESPONSE_ERROR,
            message: "Something went wrong please try again",
            data : error
       });
       return;
    });

} 