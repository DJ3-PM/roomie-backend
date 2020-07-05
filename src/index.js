const express = require('express')

const { port } = require('../config')
const db = require('./db')
const placesRoutes = require('./routes/places')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const favoritesRoutes = require('./routes/favorites')
const locationsRoutes = require('./routes/locations')
const { errorLogger, errorWrapper, errorHandler } = require('./utils/middlewares/errorMiddlewares')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')
const app = express()

// ? Stablish database connection
db.connect()

// ? Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ! REMOVE LATER WHEN READY FOR PRODUCTION
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
  next()
})

app.get('/', (req, res, next) => {
  res.send(':D')
})

// ? Routes
placesRoutes(app)
authRoutes(app)
profileRoutes(app)
favoritesRoutes(app)
locationsRoutes(app)

// ? Not found handler
app.use(notFoundHandler)

// ? Error Middlewares
app.use(errorLogger)
app.use(errorWrapper)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
