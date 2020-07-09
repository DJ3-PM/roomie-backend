const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcrypt')

// const UsersService = require('../utils/schemas/users')
const UsersService = require('../services/users')
console.log(UsersService)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await UsersService.findById(id)
  done(null, user)
})

// passport.use(new BasicStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, username, password, done) => {
//   const user = await User.findOne({ username: username })
//   console.log(user)
//   if (!user) {
//     return done(null, false)
//   }
//   if (!(await bcrypt.compare(password, user.password))) {
//     return done(null, false)
//   }
//   return done(null, user)
// }))

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    console.log('here is passport')
    try {
      const user = await UsersService.signInUser({ username, password })
      console.log(user)

      if (!user) {
        return cb(null, false)
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(null, false)
      }
      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  })
)
