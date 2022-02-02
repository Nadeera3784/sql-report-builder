const http       = require("http");
const path       = require("path");
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require('morgan');
const helmet     = require('helmet');
const cors       = require('cors');


const config_database        = require('./config/mongo');
const config_app             = require('./config/app.js');
const  {databaseInitializer} = require('./helpers/mongo');
//const seeder                  = require('./seeds');
const  Scheduler             = require('./services/Scheduler');
const  {TestController}      = require('./controllers');

const {app_route}            = require('./routes');

var app = express();

let dir_base = __dirname;

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
);

if(config_app.app.environment == "development"){
   app.use(logger('dev'));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cors());

databaseInitializer("mongodb://o2oReportingDBMaster:SccEWDcAS2@o2o-reporting-db-public.cluster-capzd9fgxyee.ap-southeast-1.docdb.amazonaws.com:27017/o2o-report?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false");

app.use(express.static(path.join(dir_base, 'public')));

app.use((request, response, next) => {
    response.setHeader('Cache-Control', 'no-cache, no-store');
    next();
});


app.get('/health', function (request, response) {
    return response.sendStatus(200);
});
    
app.get('/health_mongo', TestController.databaseCheck);

app.use('/api/v1/app', app_route);

app.get('*', (request, response) => {                       
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));                               
});

app.disable('x-powered-by');

app.set('port', config_app.app.port);

http.createServer(app).listen(app.get('port'), function () {
    Scheduler.runner();
	console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;
