const express = require('express')

const placesService = require('../services/places')

const placesRoutes = app => {
  const router = express.Router()
  app.use('/api/places', router)

  // ? Lists all the places
  router.get('/', async (req, res, next) => {
    try {
      const places = await placesService.getPlaces()

      res.status(200).json({
        data: places,
        message: 'Places listed!'
      })
    } catch (error) {
      next(error)
    }
  })

  // ? Creates a new place
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

  // ? Deletes a place
  router.delete('/:placeId', async (req, res, next) => {
    const { placeId } = req.params
    try {
      const { deletedCount } = await placesService.deletePlace({ placeId })

      res.status(200).json({
        data: {
          deletedCount
        },
        message: 'Place deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = placesRoutes
