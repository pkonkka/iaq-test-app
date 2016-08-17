// ROUTES =====================================================================
iaqApp.config(function ($routeProvider) {
   
    $routeProvider


// === Sensor routes =======================================================================

    .when('/', {
        templateUrl: 'pages/sensor/sensors.htm',
        controller: 'sensorsController'
    })

    .when('/sensors', {
        templateUrl: 'pages/sensor/sensors.htm',
        controller: 'sensorsController'
    })

    .when('/sensors/new', {
        templateUrl: 'pages/sensor/newSensor.htm',
        controller: 'newSensorController'
    })

    .when('/sensors/:id/edit', {
        templateUrl: 'pages/sensor/editSensor.htm',
        controller: 'editSensorController'
    })

    .when('/sensors/:id/view', {
        templateUrl: 'pages/sensor/viewSensor.htm',
        controller: 'viewSensorController'
    })


// === Group routes =======================================================================


    .when('/groups', {
        templateUrl: 'pages/group/groups.htm',
        controller: 'groupsController'
    })

    .when('/groups/new', {
        templateUrl: 'pages/group/newGroup.htm',
        controller: 'newGroupController'
    })

    .when('/groups/:id/edit', {
        templateUrl: 'pages/group/editGroup.htm',
        controller: 'editGroupController'
    })

    .when('/groups/:id/view', {
        templateUrl: 'pages/group/viewGroup.htm',
        controller: 'viewGroupController'
    })

// === Measurement routes =======================================================================


    .when('/measurements/:id/view', {
        templateUrl: 'pages/measurement/viewSensorMeasurements.htm',
        controller: 'viewSensorMeasurementsController'
    })

    .when('/measurements', {
        templateUrl: 'pages/measurement/measurements.htm',
        controller: 'measurementsController'
    })

// --- remove these later ----
    .when('/home', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })

});
