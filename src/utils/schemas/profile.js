const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  avatar: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  isHost: {
    type: Boolean,
    required: true,
    default: false
  },
  contactEmail: {
    type: String,
    required: false
  },
  whatsapp: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }
  ]
})

const schema = mongoose.model('Profile', ProfileSchema)

module.exports = schema
