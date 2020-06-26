const express = require('express')

const placesRoutes = app => {
  const router = express.Router()

  app.use('/api/places', router)

  router.get('/', (req, res, next) => {
    res.status(200).json({ hello: 'world' })
  })
}

module.exports = placesRoutes
