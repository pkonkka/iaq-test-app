
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');

var database                    = require('./config/database');
var setupController             = require('./controllers/v1/setupController');
var apiGroupController          = require('./controllers/v1/apiGroupController');
var apiMeasurementController    = require('./controllers/v1/apiMeasurementController');
var apiSensorController         = require('./controllers/v1/apiSensorController');
var errorController             = require('./controllers/v1/errorController');


var port = process.env.PORT || 3000;

mongoose.connect(database.database, function(err) {
    if(err) throw err;
});


setupController(app);                  
apiMeasurementController(app);
apiSensorController(app);
apiGroupController(app);
errorController(app);

app.listen(port);

console.log("Listening port: ", port);

