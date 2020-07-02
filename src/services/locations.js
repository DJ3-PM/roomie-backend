const LocationModel = require('../utils/schemas/locations')

const getZones = () => {
  const locations = LocationModel.find({})
  return locations
}

const getNeighborhoods = ({ zoneName }) => {

}

module.exports = {
  getZones,
  getNeighborhoods
}
