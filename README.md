# iaq-rest-api / iaq-test-app

## Introduction

Simple REST API that manages IoT sensors, sensor groups and measurements.

## Installation

0. Install Git
1. Clone repository from sensoan.visualstudio.com - Code - iaq-rest-api
2. Install node from https://nodejs.org
3. Run npm install
4. Run node app
5. Development version of the api is listening port 3000 

## Usage

* Api can be used from any web browser or application.
* Get commands can be executed from the browser: type in the URL box (e.g.): http://localhost:3000/v1/groups
* Other commands can be executed for example with Postman (https://www.getpostman.com)
* **Setup the database first: GET /v1/setupDatabase**

### Groups

* Get all groups: GET /v1/groups
* Get one group by mongoDB ID: GET /v1/groups/document/<document ID>
* Get one group by group name: GET /v1/groups/document/<group name>
* Update existing group: PUT /v1/groups, documentID in the request body
* Add new group: POST /v1/groups, response: documentID, group name must be unique	
* Delete group: DELETE /v1/groups/<group name>, group can be removed only if it does not have any sensors
		
### Sensors

* Get all sensors: GET /v1/sensors
* Get one sensor by sensorID: GET /v1/sensors/<sensorID>
* Get all sensors by group name: GET /v1/sensors/group/<group name>
* Get the document for mongoDB ID: GET /v1/sensors/document/<documentID>
* Update existing sensor: POST /v1/sensors, sensorID in the request body
* Add new sensor: POST /v1/sensors/new, response: sensorID
* Delete sensor: DELETE /v1/sensors/<sensorID>, sensor can be removed only if it does not have any measurements			           

### Measurements

* Get all measurements: GET /v1/measurements
* Get all measurents that are equal or newer than date1: GET /v1/measurements?date1=<add date here>, date format: YYYY-MM-DD, result sorted by timestamp in ascending order
* Get all measurements that are between date1 and date2: GET /v1/measurements/?date1=<add date here>&date2=<add date here> date format: YYYY-MM-DD, result sorted by timestamp in ascending order
* Get measurements for the sensor ID: GET /v1/measurements/sensor/<sensorID>, result sorted by timestamp in ascending order
* Get measurements for the sensor ID that are equal or newer than date1: GET /v1/measurements/sensor/<sensorID>/?date1=<add date here>
* Get measurements for the sensor ID that between date1 and date2: GET /v1/measurements/sensor/<sensorUD>/?date1=<add date here>&date2=<add date here>
* Get the latest measurement for the sensor ID: GET /v1/measurements/sensor/latest/<sensorID>
* Get the document for mongoDB ID: GET /v1/measurements/document/<documentID>
* Delete measurement: DELETE /v1/measuements/document/<documentID>	
* Add new measurement: POST /v1/measurements 		

