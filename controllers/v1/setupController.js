var uuid    = require('uuid');
var logger  = require('../../utils/actionLogger');

var Measurements    = require('../../models/measurementModel');
var Sensors         = require('../../models/sensorModel');
var Groups          = require('../../models/groupModel');
var corsHeader      = require('../../config/corsHeader');


module.exports = function(app) {


    corsHeader(app);

    app.get('/v1/setupDatabase', function(req, res) {

        // seed database
        var starterGroups = [
            {
                groupName: "Sensoan Oy",
                description: "IoT company in Salo",
                parentGroupName: ""
            },
            {
                groupName: "Mighty IoT company",
                description: "Salo",
                parentGroupName: ""
            }    
        ];        

        var starterSensors = [
            {
                sensorID: uuid.v4(),
                location: "",
                description: "",
                sensorGroupName: starterGroups[0].groupName
            },
            {
                sensorID: uuid.v4(),
                location: "",
                description: "",
                sensorGroupName: starterGroups[0].groupName
            },
            {
                sensorID: uuid.v4(),                
                location: "",
                description: "",
                sensorGroupName: starterGroups[1].groupName
            }          
       ];  

        Groups.create(starterGroups, function(err, results) {
            if (err) {
                console.log(err);
            }

        });

        Sensors.create(starterSensors, function(err, results) {
            if (err) {
                console.log(err);
                res.jsonp({success: false, error: err});
            }
        });            

        // Generate dummy measurement values and store to the database*
        for (var i = 0; i < 100; i++) {

            var sensorIndex = Math.floor(Math.random() *3);

            var starterMeasurements = [
                {
                    timestamp: Date.now(),
                    currentValue: Math.floor((Math.random() * 10) +1),
                    unit: "Pa",
                    dataType: "String",
                    sensorID: starterSensors[sensorIndex].sensorID
                }
            ];
          
            Measurements.create(starterMeasurements, function(err, results) {
                if (err) {
                    console.log(err);
                }
            }); 
        }

        logger(req, res);
        res.end();        
   });
          
}

