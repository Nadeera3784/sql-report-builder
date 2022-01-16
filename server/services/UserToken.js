const database = require('../models/sequelize');

var methods = {};

methods.create = async function(query){
    return await database.user_tokens.create(query);
}

methods.findAll = async function(query){
    return await database.user_tokens.findAll(query);
}

methods.findOne = async function(query){
    return await database.user_tokens.findOne(query);
}

methods.deleteOne = async function(query){
    return await database.user_tokens.destroy(query);
}

exports.service = methods;