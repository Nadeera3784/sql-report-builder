const mongoose   = require('mongoose');
const config_app = require('../config/app.js');

const databaseInitializer = async function (uri) {
    //Dev
    // mongoose.connect(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false
    // }); 

   //Prod
    mongoose.connect(uri, {useNewUrlParser: true, ssl: true, sslValidate: false, sslCA: `rds-combined-ca-bundle.pem`}).then(function(client){
        console.log('Mongoose connected:');
    }).catch(function(error){
        console.log('Mongoose connection URI error:',  error);
    }); 
}

module.exports = {
    databaseInitializer
};