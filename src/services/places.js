const PlaceModel = require('../utils/schemas/places') // TODO: Refactor (?)

const createPlace = place => {
  const myPlace = new PlaceModel(place)

  return new Promise((resolve, reject) => {
    myPlace.save((error, createdPlace) => {
      if (error) {
        // TODO: Handle Error
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

const deletePlace = ({ placeId }) => {
  const deletedPlace = PlaceModel.deleteOne({ _id: placeId })
  return deletedPlace
}

module.exports = {
  createPlace,
  getPlaces,
  deletePlace
}
