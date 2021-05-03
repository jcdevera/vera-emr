const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  gender: String,
  dateOfBirth: String,
  age: Number,
  diagnoses: [],
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "visits"
    }
  ]
})

module.exports = mongoose.model('Patient', patientSchema);