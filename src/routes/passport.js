const passport = require('passport')
const { BasicStrategy } = require('passport-http')

const UsersService = require('../services/users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await UsersService.findById(id)
  done(null, user)
})

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    console.log('here is passport')
    try {
      const user = await UsersService.signInUser({ username, password })
      console.log('passportUser', user)

      if (!user) {
        return cb(null, false)
      }
      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  })
)
