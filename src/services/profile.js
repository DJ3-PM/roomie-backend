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

const addPlace = ({ profileId, placeId }) => {
  return ProfileSchema.findOneAndUpdate({ _id: profileId }, { $push: { places: placeId } })
}

const addFavorite = ({ profileId, placeId }) => {
  return ProfileSchema.findOneAndUpdate({ _id: profileId }, { $push: { favorites: placeId } })
}

const profileIsHost = async ({ tmp }) => {
  const xd = await ProfileSchema.findOne({ userId: tmp })
  if (xd) {
    return xd
  } else {
    return null
  }
}

module.exports = {
  createProfile,
  addPlace,
  addFavorite,
  profileIsHost
}
