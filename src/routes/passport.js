const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../utils/schemas/users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({ username: username })
  console.log(user)
  if (!user) {
    return done(null, false)
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return done(null, false)
  }
  return done(null, user)
}))
