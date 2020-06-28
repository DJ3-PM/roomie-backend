const express = require('express')

const favoritesService = require('../services/favorites')

const favoritesRoutes = app => {
  const router = express.Router()

  app.use('/api/favorites', router)

  router.post('/', async (req, res, next) => {
    const favorite = req.body

    try {
      const createdFavoriteId = await favoritesService.createFavorite({ favorite })
      res.status(201).json({
        data: createdFavoriteId,
        message: 'Favorite Created!'
      })
    } catch (error) {
      next(error)
    }
  })

  // TODO: Get User Favorites
  router.get('/:userId', (req, res, next) => {

  })

  // TODO: Delete a User Favorite
  router.delete('/:favoriteId', (req, res, next) => {

  })
}

module.exports = favoritesRoutes
