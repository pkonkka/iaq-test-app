var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sensorGroupSchema = new Schema({
   groupName:       { type: String, required: true, unique: true },               
   description:     { type: String },
   parentGroupName: { type: String }         
});

var Groups = mongoose.model('Groups', sensorGroupSchema);
module.exports = Groups;
