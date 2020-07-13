const ProfileSchema = require('../utils/schemas/profile')

const createProfile = ({ profile }) => {
  const myProfile = new ProfileSchema(profile)

  return new Promise((resolve, reject) => {
    myProfile.save((error, createdProfile) => {
      if (error) {
        // TODO: Better Handle Error:
        throw new Error(error)
      }

      resolve(createdProfile.id)
    })
  })
}

const getProfile = ({ profileId }) => {
  return ProfileSchema.findById(profileId).populate('places')
}

const addPlace = ({ profileId, placeId }) => {
  return ProfileSchema.findOneAndUpdate({ _id: profileId }, { $push: { places: placeId } })
}

const addFavorite = ({ profileId, placeId }) => {
  return ProfileSchema.findOneAndUpdate({ _id: profileId }, { $push: { favorites: placeId } })
}

const getFavorites = ({ profileId }) => {
  return ProfileSchema.findById(profileId).populate('favorites')
}

const profileIsHost = async ({ tmp }) => {
  const xd = await ProfileSchema.findOne({ userId: tmp })
  if (xd) {
    return xd
  } else {
    return null
  }
}

const deleteFavorite = async ({ profileId, placeId }) => {
  const xd = await ProfileSchema.findOneAndUpdate({ userId: profileId }, { $pull: { favorites: placeId } })
  return xd
}

module.exports = {
  createProfile,
  getProfile,
  addPlace,
  addFavorite,
  getFavorites,
  profileIsHost,
  deleteFavorite
}
