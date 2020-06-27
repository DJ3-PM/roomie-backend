const express = require('express')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { awsAccessKey, awsSecretAccessKey } = require('../../config')
const placesService = require('../services/places')

// ? Amazon S3 Config
aws.config.update({
  secretAccessKey: awsSecretAccessKey,
  accessKeyId: awsAccessKey,
  region: 'us-east-2'
})

const s3 = new aws.S3()

// ? Multer with S3 config
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'buscando-roomie', // name of the bucket  in S3
    acl: 'public-read', // setting to be  able to request images
    metadata: (req, file, callback) => {
      callback(null, { fieldName: file.fieldname })
    },
    key: (req, file, callback) => {
      //  This might be buggy...
      const splittedName = file.originalname.split('.')
      const extension = splittedName[splittedName.length - 1]
      callback(null, `${Date.now()}.${extension}`)
    }
  })
})

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
  router.post('/', upload.single('image'), async (req, res, next) => {
    const place = req.body
    const { file } = req

    place.mainImage = file.location // add AWS S3 image url to object

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
