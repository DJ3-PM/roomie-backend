const express = require('express')

const imageUpload = require('../utils/middlewares/imageUpload')
const singleImageUrlStractor = require('../utils/middlewares/singleImageUrlStractor')
const validationHandler = require('../utils/middlewares/validationHandler')
const { createProfileSchema } = require('../utils/schemas/profileValidation')

const ProfileService = require('../services/profile')

const profileRoutes = app => {
  const router = express.Router()

  app.use('/api/profile', router)

  // ? Creates a Profile
  router.post('/',
    imageUpload.single('avatar'),
    singleImageUrlStractor('avatar'),
    validationHandler(createProfileSchema),
    async (req, res, next) => {
      try {
        const profile = req.body

        // 'parse' value
        if (profile.isHost === 'true') {
          profile.isHost = true
        } else {
          profile.isHost = false
        }

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
