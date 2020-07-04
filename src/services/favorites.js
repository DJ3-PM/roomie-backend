const FavoriteSchema = require('../utils/schemas/favorite')

const createFavorite = ({ favorite }) => {
  const myFavorite = new FavoriteSchema(favorite)

  return new Promise((resolve, reject) => {
    myFavorite.save((error, createdFavorite) => {
      if (error) {
        reject(error)
      }

      resolve(createdFavorite.id)
    })
  })
}

const getFavorites = ({ profileId }) => {
  const favoritesUser = FavoriteSchema.find({ profileId: profileId })
  return favoritesUser
}

const deleteFavorite = ({ favoriteId }) => {
  const deleteFavorite = FavoriteSchema.deleteOne({ _id: favoriteId })
  return deleteFavorite
}

module.exports = {
  createFavorite,
  getFavorites,
  deleteFavorite
}
