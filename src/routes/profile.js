const express = require('express')

const ProfileService = require('../services/profile')

const profileRoutes = app => {
  const router = express.Router()

  app.use('/api/profile', router)

  router.post('/', async (req, res, next) => {
    const profile = req.body

    try {
      const createdProfileId = await ProfileService.createProfile({ profile })
      res.status(201).json({
        data: createdProfileId,
        message: 'Profile created!'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = profileRoutes
