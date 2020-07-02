const express = require('express')

const validationHandler = require('../utils/middlewares/validationHandler')
const { createFavoriteSchema } = require('../utils/schemas/favoriteValidation')

const favoritesService = require('../services/favorites')

const favoritesRoutes = app => {
  const router = express.Router()

  app.use('/api/favorites', router)

  router.post('/', validationHandler(createFavoriteSchema), async (req, res, next) => {
    const favorite = req.body

    try {
      const createdFavoriteId = await favoritesService.createFavorite({ favorite })
      res.status(201).json({
        data: createdFavoriteId,
        message: 'Favorite created!'
      })
    } catch (error) {
      next(error)
    }
  })

  // TODO: Get Profile Favorites
  router.get('/:profileId', (req, res, next) => {

  })

  // TODO: Delete a User Favorite
  router.delete('/:favoriteId', (req, res, next) => {

  })
}

module.exports = favoritesRoutes
