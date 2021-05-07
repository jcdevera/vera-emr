const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = mongoose.SchemaType.Mixed

const patientSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  gender: String,
  dateOfBirth: String,
  notes: [
    {}
  ]
})

module.exports = mongoose.model('Patient', patientSchema);