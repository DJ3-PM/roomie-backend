const express = require('express')
const placesService = require('../services/places')
const imageUpload = require('../utils/middlewares/imageUpload')
const imageUrlStractor = require('../utils/middlewares/imageUrlStractor')
const { placeFields } = require('../utils/uploadFields')

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

  // ? Gets one place
  // TODO: Get Profile info for detail
  router.get('/:placeId', async (req, res, next) => {
    const { placeId } = req.params
    try {
      const place = await placesService.getOnePlace({ placeId })
      res.status(200).json({
        data: place,
        message: 'Place found'
      })
    } catch (error) {
      next(error)
    }
  })

  // ? Creates a new place
  router.post('/',
    imageUpload.fields(placeFields), // AWS Upload Middleware
    imageUrlStractor({ fields: placeFields }), // AWS Image URL Stractor
    async (req, res, next) => {
      const place = req.body

      // Converts string to an array of elements
      place.furniture = place.furniture.split(',').map(item => item.trim())

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

  // ? Updates a Place
  router.put('/:placeId', async (req, res, next) => {
    const { placeId } = req.params
    const placeData = req.body

    try {
      const { nModified } = await placesService.updatePlace({ placeId, placeData })
      res.status(200).json({
        data: {
          nModified
        },
        message: 'Place updated!'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = placesRoutes
