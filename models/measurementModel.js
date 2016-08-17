var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sensorMeasurementSchema = new Schema({
   timestamp:       { type: Date,   required: true }, 
   currentValue:    { type: Number, required: true },
   unit:            { type: String },
   dataType:        { type: String },
   sensorID:        { type: String, required: true }
});

var Measurements = mongoose.model('Measurements', sensorMeasurementSchema);
module.exports = Measurements;