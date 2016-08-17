// CONTROLLERS ====================================================================


// ================================================================================================================================================================
//
//       Measurement controllers
//
// ================================================================================================================================================================


// measurement result page -------------------------------------------------------------------------------------
iaqApp.controller('measurementsController', ['$scope', 'measurementQueryService', function($scope, measurementQueryService) {
    

    measurementQueryService.GetMeasurements().then(function (response) {                
        $scope.measurements = response.data.result;
    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;        
    });;

}]);


// sensor measurements result page -------------------------------------------------------------------------------------
iaqApp.controller('viewSensorMeasurementsController', ['$scope','$routeParams', 'measurementQueryService', function($scope, $routeParams, measurementQueryService) {
    
    sensorID = $routeParams.id;
    $scope.sensorID = sensorID;

    measurementQueryService.GetMeasurements(sensorID).then(function (response) {                
        $scope.measurements = response.data.result;
    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;
        
    });;

}]);


// ================================================================================================================================================================
//
//       Sensor controllers -- this is the main page of the application
//
// ================================================================================================================================================================

// sensors page -------------------------------------------------------------------------------------
iaqApp.controller('sensorsController', ['$scope', 'sensorQueryService', 'measurementQueryService',function($scope, sensorQueryService, measurementQueryService) {
    
    // default values
    $scope.sortType = 'latestUpdate';
    $scope.sortReverse = true;
    $scope.searchValue = '';

    // -----------------------------------------------------------------------------------------------------------------
    sensorQueryService.GetSensors().then(function(response) {       

        $scope.sensors = response.data.result;

        for (var i = 0; i < response.data.result.length; i++) {

            (function (i) {

                measurementQueryService.GetLatestMeasurement(response.data.result[i].sensorID).then(function(response) {
                    if (response.data.result !== null) {
                        $scope.sensors[i].latestUpdate = response.data.result.timestamp;                         
                        $scope.sensors[i].latestValue = response.data.result.currentValue; 
                    } else {
                        $scope.sensors[i].latestUpdate = "-";                                                 
                        $scope.sensors[i].latestValue = "-";                         
                    }

                });

            })(i);
        }

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;
    });


}]);



// new sensor page -------------------------------------------------------------------------------------
iaqApp.controller('newSensorController', ['$scope', '$location', 'sensorQueryService', 'groupQueryService', 'newSensorService', function($scope, $location, sensorQueryService, groupQueryService, newSensorService) {


    // First get all group names 
    groupQueryService.GetGroups().then(function(response) {

        var newOptions = [];
        for (var i=0; i < response.data.result.length; i++) {
            newOptions.push(response.data.result[i].groupName);            
        };     
        $scope.options = newOptions;
        
    });

    // save sensor and go back to view form ---------------------------------------------------------------------------
    $scope.submit = function() {

        if ($scope.sensorGroupName == "") {
            $scope.errorMessage = "Sensor group name is required."
        } else {

           sensorQueryService.SaveSensor($scope.sensorID, $scope.location, $scope.description, $scope.sensorGroupName).then(function (response) {
                $location.path("/sensors/" + $scope.sensorID + "/view");
            }, function(response) {
                $scope.errorMessage = response.status + " : " + response.statusText;        
            });
        }
        
    }
    // cancel operation and to sensors view ----------------------------------------------------------------------------
    $scope.cancelNewSensor = function() {
        $location.path("/sensors");
    }

    // get unique id for the sensor
    $scope.GetUUID = function() {
        $scope.sensorID = newSensorService.GetUUID();
    }

}]);


// view sensor page =====================================================================================
iaqApp.controller('viewSensorController', ['$scope', '$routeParams', '$location','sensorQueryService', 'groupQueryService','measurementQueryService',function($scope, $routeParams, $location, sensorQueryService, groupQueryService,measurementQueryService) {

    sensorID = $routeParams.id;

    sensorQueryService.GetSensors(sensorID).then(function (response) {                

        $scope.sensorID = response.data.result[0].sensorID;
        $scope.location = response.data.result[0].location;
        $scope.description = response.data.result[0].description;
        $scope.sensorGroupName = response.data.result[0].sensorGroupName;

        // get all group names 
        groupQueryService.GetGroups().then(function(response) {

            var newOptions = [];
            for (var i=0; i < response.data.result.length; i++) {
                newOptions.push(response.data.result[i].groupName);            
            };     
            $scope.options = newOptions;
        });


        // get measurements for the sensor
        measurementQueryService.GetMeasurements(sensorID).then(function(response) {
            $scope.measurements = response.data.result;
        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;        
        });

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;        
    });


    // edit sensor -------------------------------------------------------------------
    $scope.submit = function() {

        $location.path("/sensors/" + sensorID + "/edit");
    }

    // cancel and got sensors page --------------------------------------------------
    $scope.cancelView = function() {

        $location.path("/sensors");

    }


}]);


// edit sensor page ==================================================================================================================================
iaqApp.controller('editSensorController', ['$scope', '$routeParams', '$location','sensorQueryService', 'groupQueryService', function($scope, $routeParams, $location, sensorQueryService, groupQueryService) {

    sensorID = $routeParams.id;

    sensorQueryService.GetSensors(sensorID).then(function (response) {                

        $scope.sensorID = response.data.result[0].sensorID;
        $scope.location = response.data.result[0].location;
        $scope.description = response.data.result[0].description;
        $scope.sensorGroupName = response.data.result[0].sensorGroupName;

        // First get all group names 
        groupQueryService.GetGroups().then(function(response) {

            var newOptions = [];
            for (var i=0; i < response.data.result.length; i++) {
                newOptions.push(response.data.result[i].groupName);            
            };     
            $scope.options = newOptions;

        });

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;
        
    });


    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.submit = function() {

        sensorQueryService.UpdateSensor($scope.sensorID, $scope.location, $scope.description, $scope.sensorGroupName).then(function (response) {                
            
            $scope.sensors = response.data.result;
            $location.path("/sensors/" + sensorID + "/view");

        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;        
        });

    }

    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.deleteSensor = function() {

        sensorQueryService.DeleteSensor(sensorID).then(function (response) {                
            $scope.sensors = response.data.result;

            console.log(response.status);
            $location.path("/sensors/");

        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;
        
        });

    }


    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.cancelEdit = function() {
        
        $location.path("/sensors/" + $scope.sensorID + "/view");

    }

}]);




// ================================================================================================================================================================
//
//       Group controllers
//
// ================================================================================================================================================================

// group result page -------------------------------------------------------------------------------------
iaqApp.controller('groupsController', ['$scope', 'groupQueryService',function($scope, groupQueryService) {

    groupQueryService.GetGroups().then(function (response) {                
        $scope.groups = response.data.result;

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;        
    });

}]);


// new group page -------------------------------------------------------------------------------------
iaqApp.controller('newGroupController', ['$scope', '$location', 'groupQueryService', function($scope, $location, groupQueryService) {


    // Get all existing groups first
    groupQueryService.GetGroups().then(function(response) {

        var newOptions = [];
        for (var i=0; i < response.data.result.length; i++) {
            newOptions.push(response.data.result[i].groupName);            
        };     
        $scope.options = newOptions;
        
    });

    $scope.submit = function() {

        groupQueryService.SaveGroup($scope.groupName, $scope.description, $scope.parentGroupName).then(function (response) {                
            $location.path("/groups/");
        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;        
        });
    }

    $scope.cancelNewGroup = function() {
        $location.path("/groups");
    }


}]);


// view group page -------------------------------------------------------------------------------------
iaqApp.controller('viewGroupController', ['$scope', '$routeParams', '$location','groupQueryService', function($scope, $routeParams, $location, groupQueryService) {

    documentID = $routeParams.id;

    groupQueryService.GetGroups().then(function (response) {                

        // populate the group list and get field values for the form
        var newOptions = [];
        for (var i=0; i < response.data.result.length; i++) {
            newOptions.push(response.data.result[i].groupName);

            if (response.data.result[i]._id == documentID) {
                $scope.groupName = response.data.result[i].groupName;
                $scope.description = response.data.result[i].description;  
                $scope.parentGroupName = response.data.result[i].parentGroupName;
            }
        }     
        $scope.options = newOptions;

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;        
    });


    // Submit/Edit action --------------------------------------------------
    $scope.submit = function() {

        $location.path("/groups/" + documentID + "/edit");
    }

    // Cancel action --------------------------------------------------
    $scope.cancelView = function() {

        $location.path("/groups");

    }

}]);


// edit group page -------------------------------------------------------------------------------------
iaqApp.controller('editGroupController', ['$scope', '$routeParams', '$location','groupQueryService', function($scope, $routeParams, $location, groupQueryService) {


    documentID = $routeParams.id;

    groupQueryService.GetGroups().then(function (response) {

        // populate the group list and get field values for the form
        var newOptions = [];
        for (var i=0; i < response.data.result.length; i++) {
            newOptions.push(response.data.result[i].groupName);

            if (response.data.result[i]._id == documentID) {
                $scope.groupName = response.data.result[i].groupName;
                $scope.description = response.data.result[i].description;  
                $scope.parentGroupName = response.data.result[i].parentGroupName;
            }
        }     
        $scope.options = newOptions;

    }, function(response) {
        $scope.errorMessage = response.status + " : " + response.statusText;
    });

    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.submit = function() {

        groupQueryService.UpdateGroup(documentID, $scope.groupName, $scope.description, $scope.parentGroupName).then(function (response) {                
            
            $scope.groups = response.data.result;
            $location.path("/groups");

        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;            
            $location.path("/groups/");         
        });

    }

    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.deleteGroup = function() {

        groupQueryService.DeleteGroup($scope.groupName).then(function (response) {                
            $location.path("/groups/");

        }, function(response) {
            $scope.errorMessage = response.status + " : " + response.statusText;
        });

    }


    // ----------------------------------------------------------------------------------------------------------------------------
    $scope.cancelEdit = function() {
        
        $location.path("/groups/");

    }

}]);