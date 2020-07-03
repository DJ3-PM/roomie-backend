const LocationModel = require('../utils/schemas/locations')

const getZones = () => {
  const locations = LocationModel.find({})
  return locations
}

const getNeighborhoods = () => {
  const neighborhoods = LocationModel.find({})
  return neighborhoods
}

module.exports = {
  getZones,
  getNeighborhoods
}
