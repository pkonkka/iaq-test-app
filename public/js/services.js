// SERVICES =======================================================================
iaqApp.service('cityService', function() {

    this.city = "Helsinki";

});


iaqApp.service('weatherService', ['$http', function($http) {

    this.GetWeather = function (city, days) {

        return $http({
            method: 'JSONP',
            url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Helsinki&APPID=bdacc3ee6063dd08e4b8ec16805cdbbc",
            headers: { Accept: 'application/json' },
             params: { callback: "JSON_CALLBACK" }
        });
    };

}]);


// ------------------------------------------------------------------------------------------------
iaqApp.service('groupService', function() {


});

// ------------------------------------------------------------------------------------------------
iaqApp.service('groupQueryService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {


    // Get group info from the database
    this.GetGroups = function(documentID) {

        if (documentID === undefined) {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/groups",
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });

        } else {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/groups/" + documentID,
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });

        }
    }

    // Save new group to the database
    this.SaveGroup = function(groupName, description, parentGroupName) {

        return $http({
            method:     'POST',
            url:        API_END_POINT.url + "/groups/new",
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" },                
            data:       { groupName: groupName, description: description, parentGroupName: parentGroupName}
        });
  
    }

    // Update existing group in the database
    this.UpdateGroup = function(documentID, groupName, description, parentGroupName) {

        return $http({
            method:     'PUT',
            url:        API_END_POINT.url + "/groups/",
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" },                
            data:       { _id: documentID, groupName: groupName, description: description, parentGroupName: parentGroupName}
        });

    }

    this.DeleteGroup = function(documentID) {

        return $http({
            method:     'DELETE',
            url:        API_END_POINT.url + "/groups/" + documentID,
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" }                
        });

    }



}]);


// ------------------------------------------------------------------------------------------------
iaqApp.service('sensorService', function() {


});


// ------------------------------------------------------------------------------------------------
iaqApp.service('sensorQueryService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {


    this.GetSensors = function(sensorID) {

        if (sensorID === undefined) {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/sensors",
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });

        } else {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/sensors/" + sensorID,
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });
        }
    }

    // Save new sensor to the database
    this.SaveSensor = function(sensorID, location, description, sensorGroupName) {

        return $http({
            method:     'POST',
            url:        API_END_POINT.url + "/sensors/new",
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" },                
            data:       { sensorID: sensorID, location: location, description: description, sensorGroupName: sensorGroupName}
        });
    }


    // Update existing sensor in the database
    this.UpdateSensor = function(sensorID, location, description, sensorGroupName) {

        return $http({
            method:     'PUT',
            url:        API_END_POINT.url + "/sensors/",
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" },                
            data:       { sensorID: sensorID, location: location, description: description, sensorGroupName: sensorGroupName}
        });
    }


    this.DeleteSensor = function(sensorID) {

        return $http({
            method:     'DELETE',
            url:        API_END_POINT.url + "/sensors/" + sensorID,
            headers:    { Accept: 'application/json' },                
            params:     { callback: "JSON_CALLBACK" }                
        });

    }

}]);


// ------------------------------------------------------------------------------------------------
iaqApp.service('measurementService', function() {


});


// ------------------------------------------------------------------------------------------------
iaqApp.service('measurementQueryService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {

    this.GetMeasurements = function(sensorID) {

        // get all measurements
        if (sensorID === undefined) {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/measurements",
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });

        } else {

            return $http({
                method:     'JSONP',
                url:        API_END_POINT.url + "/measurements/sensor/" + sensorID,
                headers:    { Accept: 'application/json' },
                params:     { callback: "JSON_CALLBACK" }
            });

        }
    }

    this.GetLatestMeasurement = function(sensorID) {

        return $http({
            method:     'JSONP',
            url:        API_END_POINT.url + "/measurements/sensor/latest/" + sensorID,
            headers:    { Accept: 'application/json' },
            params:     { callback: "JSON_CALLBACK" }
        });

    }


}]);



// ------------------------------------------------------------------------------------------------
iaqApp.service('newSensorService', function() {

    this.GetUUID = function() {
        return uuid();
    }

});

