const database = require('../models/sequelize');

var methods = {};

methods.findAll = async function(query){
    return await database.organizations.findAll(query);
}

methods.findByID = async function(id){
    return await database.organizations.findOne({where: {id: id}});
}


exports.service = methods;