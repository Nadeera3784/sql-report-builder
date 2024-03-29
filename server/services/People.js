const database = require('../models/sequelize');

var methods = {};


methods.findAll = async function(query){
    return await database.people.findAll(query);
}

methods.findByID = async function(id){
    return await database.people.findOne({where: {id: id}});
}

exports.service = methods;