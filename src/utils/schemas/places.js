const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true,
    default: true
  },
  furniture: [
    {
      type: String
    }
  ]
})

const schema = mongoose.model('Place', placeSchema)

module.exports = schema
