const express = require('express')

const placesService = require('../services/places')

const placesRoutes = app => {
  const router = express.Router()

  app.use('/api/places', router)

  router.get('/', (req, res, next) => {
    res.status(200).json({ hello: 'world' })
  })

  router.post('/', async (req, res, next) => {
    const place = req.body
    try {
      const createdPlaceId = await placesService.createPlace(place)
      res.status(201).json({
        data: createdPlaceId,
        message: 'Place created!'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = placesRoutes
