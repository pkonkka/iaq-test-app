var Groups      = require('../../models/groupModel');
var Sensors     = require('../../models/sensorModel');
var bodyParser  = require('body-parser');
var uuid        = require('uuid');
var logger      = require('../../utils/actionLogger');
var corsHeader  = require('../../config/corsHeader');

module.exports = function (app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    corsHeader(app);

    // ======================================================================================================
    // get all groups
    // ======================================================================================================    
    app.get('/v1/groups', function(req, res) {        
        Groups.find(function(err, groups) {
           if(err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: groups});
           }
        }).sort({ groupName: 1});

        logger(req, res);
    });

    // ======================================================================================================    
    // get groups by document ID
    // ======================================================================================================    
    app.get('/v1/groups/:id', function(req, res) {         

        Groups.find({ _id: req.params.id}, function(err, groups) {
           if(err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: groups});
           }
        });        

        logger(req, res);
    });

    // ======================================================================================================
    // get group by group name
    // ======================================================================================================    
    app.get('/v1/groups/group/:name', function(req, res) {

        Groups.find({ groupName: req.params.name}, function(err, groups) {
           if(err) {
               res.jsonp({success: false, error: err});
           } else {
               res.jsonp({success: true, result: groups});
           }
        });        

        logger(req, res);
        
    });

    // ======================================================================================================
    // update existing group
    // ======================================================================================================    
    app.put('/v1/groups', function(req, res) {

        Groups.findOneAndUpdate({ _id: req.body._id}, {
            groupName:          req.body.groupName,
            description:        req.body.description,
            parentGroupName:    req.body.parentGroupName
        }, function(err) {
            if(err) {
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: "Success"});
            }
        });
    });

    // ======================================================================================================
    // add new group
    // ======================================================================================================    
    app.post('/v1/groups/new', function(req, res) {

        var newGroup = Groups({
            groupName:          req.body.groupName,
            description:        req.body.description,
            parentGroupName:    req.body.parentGroupName
        });
        
        newGroup.save(function(err) {
            if(err) {
                res.jsonp({success: false, error: err});
            } else {
                res.jsonp({success: true, result: newGroup._id});
            }
        });
        logger(req, res);
    });

    // ======================================================================================================    
    // delete group
    // ======================================================================================================    
    app.delete('/v1/groups/:name', function(req, res) {

        // check children first - delete only if no children   
        Sensors.find({ sensorGroupName: req.params.name}, function(err, sensors) {
            if (err) {
                res.jsonp({success: false, error: err});
            }
            if ( sensors != "") {
                res.status(403).jsonp({success: false, error: "Sensors linked to the group found - group not removed." })
            } else {
                // sensors not found - group can be removed from the database
                Groups.findOneAndRemove({ groupName: req.params.name }, function(err) {
                    if(err) {
                        res.jsonp({success: false, error: err});
                    } else {
                        res.jsonp({success: true, result: "Group removed succesfully"})
                    }
                });              
            }
        });

        logger(req, res);
    });
}

