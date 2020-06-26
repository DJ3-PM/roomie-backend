const express = require('express')
const app = express()

const { config } = require('../config/index')

// app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('xd')
})

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`)
})
