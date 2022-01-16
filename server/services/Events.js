const database = require('../models/sequelize');

var methods = {};


methods.findAll = async function(query){
    return await database.events.findAll(query);
}

methods.findByID = async function(id){
    return await database.events.findOne({where: {id: id}});
}

exports.service = methods;