var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sensorIdSchema = new Schema({
   sensorID:            { type: String, required: true, unique: true },         
   location:            { type: String },
   description:         { type: String },
   sensorGroupName:     { type: String }                     
});

var Sensors = mongoose.model('Sensors', sensorIdSchema);
module.exports = Sensors;
