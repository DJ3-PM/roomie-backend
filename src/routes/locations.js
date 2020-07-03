const express = require('express')
const locationsServices = require('../services/locations')

const locationsRoutes = app => {
  const router = express.Router()
  app.use('/api/locations', router)

  // ? Lists all the zones
  router.get('/', async (req, res, next) => {
    try {
      const tmp = await locationsServices.getZones()
      const zones = []

      tmp.forEach(element => {
        if (!zones.includes(element.zona) && element.zona != null) {
          zones.push(element.zona)
        }
      })

      res.status(200).json({
        data: zones,
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
