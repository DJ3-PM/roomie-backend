const LocationModel = require('../utils/schemas/locations')

const getLocations = () => {
  const locations = LocationModel.find({})
  console.log(locations)
  return locations
}

const getOneLocation = ({ zoneName }) => {

}

module.exports = {
  getLocations,
  getOneLocation
}
