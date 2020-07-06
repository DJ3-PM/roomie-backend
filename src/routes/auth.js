const express = require('express')
const passport = require('passport')

const usersService = require('../services/users')
const validationHandler = require('../utils/middlewares/validationHandler')
const { createUserSchema } = require('../utils/schemas/usersValidation')

const authRoutes = app => {
  const router = express.Router()
  app.use('/api/auth', router)

  // ? Creates a new user
  router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
    const user = req.body

    try {
      const { error, createdUserId } = await usersService.createUser({ user })

      if (error) {
        return res.status(400).json({
          error,
          message: 'Error'
        })
      }

      res.status(201).json({
        data: createdUserId,
        message: 'User created!'
      })
    } catch (error) {
      next(error)
    }
  })

  // TODO: User Signin
  router.post('/sign-in', async (req, res, next) => {
    const user = req.body

    try {
      const signInUser = await usersService.signInUser({ user })

      if (!signInUser) {
        return res.status(404).json({
          data: [],
          message: 'Not user found or Incorrect Password'
        })
      }

      res.status(200).json({
        data: signInUser,
        message: 'User found'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = authRoutes
