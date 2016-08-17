var Measurements    = require('../../models/measurementModel');
var bodyParser      = require('body-parser');
var logger          = require('../../utils/actionLogger');
var corsHeader      = require('../../config/corsHeader');

module.exports = function (app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    corsHeader(app);

    // ======================================================================================================            
    // get all measurements
    // get measurements based on a date
    // ======================================================================================================                        
    app.get('/v1/measurements', function(req, res) {

        if (req.query.start == undefined && req.query.end == undefined) {
            
            Measurements.find(function(err, measurements) {
               if(err) throw err;
               if(err) {
                   res.jsonp({success: false, error: err});
               } else {
                   res.jsonp({success: true, result: measurements});
               }
            });

        } else {

            // get measurements based on date 
            if (req.query.end == undefined) {

                // get all measurements that are same or newer than startDate
                Measurements.find({ timestamp: { $gte: req.query.start} }, function(err, measurements) {
                    if (err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: measurements});
                    }
                }).sort( { timestamp: 1 });  // sort in ascending order

            } else {

                // get all measurements between start and end dates
                Measurements.find({ $and: [
                    { timestamp: { $gte: req.query.start }},
                    { timestamp: { $lt: req.query.end }}
            
                ]}, function(err, measurements) {
                    if (err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: measurements});
                    }
                }).sort({ timestamp: 1 }); // sort in ascending order
            }            
        }

        logger(req, res);
    });


    // ======================================================================================================            
    // get measurements for the sensor ID
    // ======================================================================================================                
    app.get('/v1/measurements/sensor/:sensor', function(req, res) {           

        if (req.query.start == undefined && req.query.end == undefined) {

            Measurements.find({ sensorID: req.params.sensor}, function(err, measurements) {
                if(err) {
                    res.jsonp({success: false, error: err});
                } else {
                    res.jsonp({success: true, result: measurements});
                }
            }).sort({ timestamp: 1});

        } else {

            if (req.query.end == undefined) {

                Measurements.find({ $and: [ 
                    { sensorID: req.params.sensor },
                    { timestamp: {$gte: req.query.start }}

                ]}, function(err, measurements) {
                    if(err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: measurements});
                    }
                }).sort({ timestamp: 1});
            } else {

                // get sensor measurements between start and end dates
                Measurements.find({ $and: [
                    { sensorID: req.params.sensor },
                    { timestamp: { $gte: req.query.start }},
                    { timestamp: { $lt: req.query.end }}
            
                ]}, function(err, measurements) {
                    if (err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: measurements});
                    }
                }).sort({ timestamp: 1 }); // sort in ascending order
            }  
        }     

        logger(req, res);
    });


    // ======================================================================================================            
    // get the latest measurement for the sensor ID
    // ======================================================================================================                
    app.get("/v1/measurements/sensor/latest/:sensor", function(req, res) {

        Measurements.findOne({ sensorID: req.params.sensor}, function(err, measurements) {
            if (err) {
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: measurements});
            }
        }).sort({ timestamp: -1 });

    });
    

    // ======================================================================================================                
    // get the document for the mongoDB id
    // ======================================================================================================                
    app.get('/v1/measurements/document/:id', function(req, res) {
       Measurements.find({ _id: req.params.id}, function(err, measurements) {
          if(err) {
              res.jsonp({success: false, error: err});
          } else {
              res.jsonp({success: true, result: measurements});
          }
       });

       logger(req, res);
    });

    // ======================================================================================================            
    // delete measurement
    // ======================================================================================================                
    app.delete('/v1/measurements/document/:id', function(req, res) {       
        Measurements.findOneAndRemove( { _id: req.params.id }, function(err) {
           if (err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: "Success"});
           }            
        });         

        logger(req, res);
    });

    // ======================================================================================================            
    // add new measurement document to the collection
    // ======================================================================================================                
    app.post('/v1/measurements', function(req, res) {

        var newMeasurement = Measurements({
            timestamp:      Date.now(),
            currentValue:   req.body.currentValue,
            unit:           req.body.unit,
            dataType:       req.body.dataType,
            sensorID:       req.body.sensorID           
        });

        newMeasurement.save(function(err) {
            if(err) {
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: newMeasurement._id});
            }
        });

        logger(req, res);
    });    
}

