const express = require('express')

const { port } = require('../config')
const db = require('./db')
const placesRoutes = require('./routes/places')

const app = express()

// ? Stablish database connection
db.connect()

// ? Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  res.send(':D')
})

// ? Routes
placesRoutes(app)

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
