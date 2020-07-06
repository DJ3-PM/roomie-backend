const bcrypt = require('bcrypt')
const UserSchema = require('../utils/schemas/users')

const createUser = async ({ user }) => {
  const { username, password } = user

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await UserSchema.find({ username })

  const newUser = {
    username,
    password: hashedPassword
  }

  return new Promise((resolve, reject) => {
    if (existingUser.length > 0) {
      resolve({
        error: 'User already exists',
        createdUserId: null
      })
    }

    const myUser = new UserSchema(newUser)
    myUser.save((error, createdUser) => {
      if (error) {
        reject(error)
      }

      resolve({
        error: null,
        createdUserId: createdUser.id
      })
    })
  })
}

const signInUser = async ({ user }) => {
  const { username, password } = user

  const userFound = await UserSchema.findOne({ username: username })

  if (!userFound) {
    return null
  }
  const match = await bcrypt.compare(password, userFound.password)
  if (userFound && !match) {
    return null
  } else {
    // const xd = userFound.collection.findOne({ isHost: true })
    return userFound
  }
}

module.exports = {
  createUser,
  signInUser
}
