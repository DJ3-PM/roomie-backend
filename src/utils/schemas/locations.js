const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({
  zona: {
    type: String,
    required: true
  },
  barrio: {
    type: String,
    required: true
  }
})

const schema = mongoose.model('Location', locationSchema)

module.exports = schema
