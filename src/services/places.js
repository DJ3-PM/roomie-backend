const PlaceModel = require('../utils/schemas/places') // TODO: Refactor (?)
const profileService = require('../services/profile')

const createPlace = place => {
  const myPlace = new PlaceModel(place)

  return new Promise((resolve, reject) => {
    myPlace.save(async (error, createdPlace) => {
      if (error) {
        // TODO: Handle Error
        reject(error)
      }
      const { profileId } = place
      const placeId = createdPlace.id
      try {
        await profileService.addPlace({ profileId, placeId })
      } catch (error) {
        reject(error)
      }
      resolve(createdPlace.id)
    })
  })
}

const getPlaces = () => {
  const places = PlaceModel.find({}) // returns a promise
  return places
}

const getOnePlace = ({ placeId }) => {
  const place = PlaceModel.findById(placeId).populate('profileId')
  return place
}

const deletePlace = ({ placeId }) => {
  const deletedPlace = PlaceModel.deleteOne({ _id: placeId })
  return deletedPlace
}

const updatePlace = ({ placeId, placeData }) => {
  const updatedPlace = PlaceModel.updateOne({ _id: placeId }, placeData)
  return updatedPlace
}

module.exports = {
  createPlace,
  getPlaces,
  deletePlace,
  updatePlace,
  getOnePlace
}
