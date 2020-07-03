const mongoose = require('mongoose')

const Schema = mongoose.Schema

// TODO: Add reference to Profile Schema
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
  wifi: {
    type: Boolean,
    default: false
  },
  bath: {
    type: Boolean,
    default: false
  },
  parking: {
    type: Boolean,
    default: false
  },
  tv: {
    type: Boolean,
    default: false
  },
  cleaning: {
    type: Boolean,
    default: false
  },
  closet: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  }
})

const schema = mongoose.model('Place', placeSchema)

module.exports = schema
