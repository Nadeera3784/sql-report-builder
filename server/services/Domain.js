const database = require('../models/sequelize');

var methods = {};


methods.findAll = async function(query){
    return await database.domains.findAll(query);
}

methods.findOne = async function(query){
    return await database.domains.findOne(query);
}

exports.service = methods;