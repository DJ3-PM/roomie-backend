const LocationModel = require('../utils/schemas/locations')

const getZones = () => {
  const locations = LocationModel.find({})
  return locations
}

const getNeighborhoods = ({ zoneName }) => {
  // const neighborhoods = LocationModel.find({ zoneName: 'barrio' })
  // return neighborhoods
}

module.exports = {
  getZones,
  getNeighborhoods
}
