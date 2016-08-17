var Sensors         = require('../../models/sensorModel');
var Measurements    = require('../../models/measurementModel');
var bodyParser      = require('body-parser');
var logger          = require('../../utils/actionLogger');
var corsHeader      = require('../../config/corsHeader');


module.exports = function (app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    corsHeader(app);

    // ======================================================================================================            
    // get all sensors
    // ======================================================================================================                
    app.get('/v1/sensors', function(req, res) {      

        Sensors.find(function(err, sensors) {
            
           if(err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: sensors});
           }
        });        

        logger(req, res);
    });

    // ======================================================================================================            
    // get a sensor for the sensor ID
    // ======================================================================================================                
    app.get('/v1/sensors/:sensor', function(req, res) {           
        Sensors.find({ sensorID: req.params.sensor}, function(err, sensors) {
           if (err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: sensors});
           }
        });        

        logger(req, res);
    });

    // ======================================================================================================            
    // get all sensors by groupName
    // ======================================================================================================                
    app.get('/v1/sensors/group/:groupName', function(req, res) {      
        Sensors.find({ sensorGroupName: req.params.groupName}, function(err, sensors) {
            if (err) {
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: sensors});
            }
        });        

        logger(req, res);
    });

    // ======================================================================================================                 
    // get the document for the mongoDB id
    // ======================================================================================================                
    app.get('/v1/sensors/document/:id', function(req, res) {
       Sensors.find({ _id: req.params.id}, function(err, sensors) {
          if (err) {
              res.jsonp({success: false, error: err});
          } else {
              res.jsonp({success: true, result: sensors});
          }
       });

       logger(req, res);
    });

    // ======================================================================================================            
    // update existing sensor
    // ======================================================================================================                
    app.put("/v1/sensors", function(req, res) {

        // update existing sensor
        if (req.body.sensorID) {

            Sensors.findOneAndUpdate({ sensorID: req.body.sensorID}, {
                sensorID: req.body.sensorID,
                location: req.body.location,
                description: req.body.description,
                sensorGroupName: req.body.sensorGroupName
            }, function(err) {
                if (err) {
                    res.jsonp({success: false, error: err});
                } else {
                    res.jsonp({success: true, result: "Success"});
                }
            });
        }

        logger(req, res);
    });

    // ======================================================================================================            
    // add new sensor to the database 
    // ======================================================================================================                
    app.post("/v1/sensors/new", function(req, res) {

        var newSensor = Sensors({
            sensorID: req.body.sensorID,
            location: req.body.location,
            description: req.body.description,
            sensorGroupName: req.body.sensorGroupName                   
        });

        newSensor.save(function(err) {
            if (err) {
                logger(req,res);
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: newSensor._id});
            }
        });

        logger(req, res);
    });

    // ======================================================================================================            
    // delete sensor
    // ======================================================================================================                
    app.delete('/v1/sensors/:sensorID', function(req, res) {

        // check children first - delete only if no children
        Measurements.find({ sensorID: req.params.sensorID}, function(err, measurements) {
            if (err) {
                res.jsonp({success: false, error: err});
            }

            if (measurements != "") {                
                res.status(403).jsonp({success: false, error: "Measurements found - sensor not removed."})
            } else {
                // measurements not found - sensor can be removed from the database
                Sensors.findOneAndRemove({ sensorID: req.params.sensorID }, function(err) {
                    if (err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: "Sensor removed succesfully"})
                    }
                });
            }
        });
        logger(req, res);
    });

}

