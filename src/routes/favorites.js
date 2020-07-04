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

  // Get Profile Favorites
  router.get('/:profileId', async (req, res, next) => {
    const { profileId } = req.params

    try {
      const favorites = await favoritesService.getFavorites({ profileId })
      res.status(200).json({
        data: favorites,
        message: 'Favorites listed'
      })
    } catch (error) {
      next(error)
    }
  })

  // Delete a User Favorite
  router.delete('/:favoriteId', async (req, res, next) => {
    const { favoriteId } = req.params

    try {
      const { deletedFavorite } = await favoritesService.deleteFavorite({ favoriteId })
      res.status(200).json({
        data: {
          deletedFavorite
        },
        message: 'Favorite deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = favoritesRoutes
