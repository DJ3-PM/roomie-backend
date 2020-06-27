const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  furniture: [
    {
      type: String
    }
  ],
  size: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const schema = mongoose.model('Place', placeSchema)

module.exports = schema
