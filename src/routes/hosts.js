const express = require('express')

const HostsService = require('../services/hosts')

const hostsRoutes = app => {
  const router = express.Router()

  app.use('/api/hosts', router)

  router.post('/', async (req, res, next) => {
    const host = req.body

    try {
      const createdHostId = await HostsService.createHost({ host })
      res.status(200).json({
        data: createdHostId,
        message: 'Host created!'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = hostsRoutes
