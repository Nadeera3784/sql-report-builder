const mongoose = require('mongoose');
const {Dataset_Model} = require('../models/mongo');

var methods = {};

methods.findAll = async function(){
    return await Dataset_Model.find({});
}

methods.findByID = async function(id){
    return await Dataset_Model.findById(mongoose.Types.ObjectId(id));
}

methods.deleteMany = async function(query){
    return await Dataset_Model.deleteMany(query);
}

exports.service = methods;