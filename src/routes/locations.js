const express = require('express')
const locationsServices = require('../services/locations')

const locationsRoutes = app => {
  const router = express.Router()
  app.use('/api/locations', router)

  router.get('/', async (req, res, next) => {
    try {
      const locations = await locationsServices.getLocations()

      res.status(200).json({
        data: locations,
        message: 'Zones listed'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = locationsRoutes
