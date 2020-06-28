const express = require('express')

const authRoutes = app => {
  const router = express.Router()
  app.use('/api/auth', router)

  router.post('/sign-up', (req, res, next) => {
    const user = req.body
  })
}

module.exports = authRoutes
