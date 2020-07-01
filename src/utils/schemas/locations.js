const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({
  zone: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  }
})

const schema = mongoose.model('Location', locationSchema)

module.exports = schema
