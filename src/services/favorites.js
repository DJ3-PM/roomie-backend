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
  const profileFavorites = ProfileService.getFavorites({ profileId })
  return profileFavorites
}

module.exports = {
  createFavorite,
  getFavorites
}
