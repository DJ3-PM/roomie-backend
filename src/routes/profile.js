const express = require('express')

const ProfileService = require('../services/profile')

const profileRoutes = app => {
  const router = express.Router()

  app.use('/api/profile', router)

  // ? Creates a Profile
  // TODO: Add imageUpload Middleware for avatar
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

  // TODO: Update/Modify Profile
  router.put('/:profileId', (req, res, next) => {

  })
}

module.exports = profileRoutes
