const mongoose = require('mongoose');
const {CustomReport_Model} = require('../models/mongo');

var methods = {};

methods.create = async function(query){
    return await CustomReport_Model.create(query);
}

methods.findAll = async function(){
    return await CustomReport_Model.find({});
}

methods.findByID = async function(id){
    return await CustomReport_Model.findById(mongoose.Types.ObjectId(id));
}

methods.search = async function(query){
    return await CustomReport_Model.find(query);
}

methods.findByIDWithRelation = async function(id){
    return await CustomReport_Model.findById(mongoose.Types.ObjectId(id)).populate('dataset_id');
}

methods.deleteOne = async function(query){
    return await CustomReport_Model.deleteOne(query);
}

methods.deleteMany = async function(query){
    return await CustomReport_Model.deleteMany(query);
}

exports.service = methods;