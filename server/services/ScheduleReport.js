const mongoose = require('mongoose');
const {ScheduleReport_Model} = require('../models/mongo');

var methods = {};

methods.create = async function(query){
    return await ScheduleReport_Model.create(query);
}

methods.findAll = async function(){
    return await ScheduleReport_Model.find({});
}

methods.findAllWithRelation = async function(query){
    return await ScheduleReport_Model.find(query).populate('custom_report_id');
}

methods.findByID = async function(id){
    return await ScheduleReport_Model.findById(mongoose.Types.ObjectId(id));
}

methods.search = async function(query){
    return await ScheduleReport_Model.find(query);
}

methods.update = async function(id, query){
    return await ScheduleReport_Model.findOneAndUpdate(id, query, { new: true });
 }
 
methods.deleteOne = async function(query){
    return await ScheduleReport_Model.deleteOne(query);
}

methods.deleteMany = async function(query){
    return await ScheduleReport_Model.deleteMany(query);
}

exports.service = methods;