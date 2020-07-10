const express = require('express')
const passport = require('passport')
const cors = require('cors')

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

const session = require('express-session')

// ? Stablish database connection
db.connect()

require('./routes/passport')

// ? Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'xd'
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

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
