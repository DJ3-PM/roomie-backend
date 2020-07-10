const FavoriteSchema = require('../utils/schemas/favorite')
const ProfileService = require('./profile')

const createFavorite = async ({ favorite }) => {
  const { placeId, profileId } = favorite

  try {
    await ProfileService.addFavorite({ profileId, placeId })
  } catch (error) {
    console.log(error)
  }
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
