const express = require('express')
const locationsServices = require('../services/locations')

const locationsRoutes = app => {
  const router = express.Router()
  app.use('/api/locations', router)

  // ? Lists all the zones
  router.get('/', async (req, res, next) => {
    try {
      const tmp = await locationsServices.getZones()
      const locations = []

      tmp.forEach(element => {
        if (!locations.includes(element.zona)) {
          locations.push(element.zona)
        }
      })

      res.status(200).json({
        data: locations,
        message: 'Zones listed'
      })
    } catch (error) {
      next(error)
    }
  })

  // ? Lists all the neighborhood in zone
  router.get('/:zona', async (req, res, next) => {
    const { zoneName } = req.params
    console.log({ zoneName })
    try {
      const location = await locationsServices.getNeighborhoods({ zoneName })
      res.status(200).json({
        data: location,
        message: 'Neighborhoods listed'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = locationsRoutes
