const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const visitSchema = new Schema({
  created_on: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    required: true,
  }
})


module.exports = mongoose.model('Visit', visitSchema)