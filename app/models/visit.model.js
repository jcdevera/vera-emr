const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const visitScehma = new Schema({
  created_by: String,
  created_on: Date,
  notes: String
})


module.exports = mongoose.model('Visit', visitScehma)