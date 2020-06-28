const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HostSchema = new Schema({
  avatar: {
    type: String,
    required: true
  },
  publicEmail: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  }
})

const schema = mongoose.model('Host', HostSchema)

module.exports = schema
