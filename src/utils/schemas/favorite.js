const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }
})

const schema = mongoose.model('Favorite', FavoriteSchema)

module.exports = schema
