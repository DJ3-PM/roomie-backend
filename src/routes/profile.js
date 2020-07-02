const express = require('express')

const imageUpload = require('../utils/middlewares/imageUpload')
const validationHandler = require('../utils/middlewares/validationHandler')
const { createProfileSchema } = require('../utils/schemas/profileValidation')

const ProfileService = require('../services/profile')

const profileRoutes = app => {
  const router = express.Router()

  app.use('/api/profile', router)

  // ? Creates a Profile
  router.post('/',
    imageUpload.single('image'),
    validationHandler(createProfileSchema),
    async (req, res, next) => {
      try {
        const profile = req.body
        const { file } = req

        profile.avatar = file.location // obtain AWS S3 Image URL

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
