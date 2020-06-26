const express = require('express')

const db = require('./db')

const app = express()
db.connect()

const { config } = require('../config/index')

// app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('xd')
})

app.listen(config.port, () => {
  console.log(`Listening on: http://localhost:${config.port}`)
})
