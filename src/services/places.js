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

module.exports = {
  createPlace
}
