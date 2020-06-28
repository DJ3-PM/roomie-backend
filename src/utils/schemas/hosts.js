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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const schema = mongoose.model('Host', HostSchema)

module.exports = schema
