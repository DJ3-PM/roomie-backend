const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }
})

const schema = mongoose.model('Favorite', FavoriteSchema)

module.exports = schema
