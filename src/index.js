const express = require('express')

const { port } = require('../config')
const db = require('./db')
const placesRoutes = require('./routes/places')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const favoritesRoutes = require('./routes/favorites')
const locationsRoutes = require('./routes/locations')
const { errorLogger, errorWrapper, errorHandler } = require('./utils/middlewares/errorMiddlewares')
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
authRoutes(app)
profileRoutes(app)
favoritesRoutes(app)
locationsRoutes(app)

// ? Error Middlewares
app.use(errorLogger)
app.use(errorWrapper)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
