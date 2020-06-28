const express = require('express')
const usersService = require('../services/users')

const authRoutes = app => {
  const router = express.Router()
  app.use('/api/auth', router)

  router.post('/sign-up', async (req, res, next) => {
    const user = req.body

    try {
      const createdUserId = await usersService.createUser({ user })
      res.status(201).json({
        data: createdUserId,
        message: 'User created!'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = authRoutes
