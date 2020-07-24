const bcrypt = require('bcrypt')
const UserSchema = require('../utils/schemas/users')
const serviceProfile = require('../services/profile')

const createUser = async ({ user }) => {
  const { username, password } = user

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await UserSchema.find({ username })
  // TODO:
  // You could return the response here
  // if (existingUser.length > 0) {
  //   return Promise.resolve({
  //     error: 'User already exists',
  //     createdUserId: null
  //   })
  // }

  const newUser = {
    username,
    password: hashedPassword
  }

  return new Promise((resolve, reject) => {
    // TODO:
    // Not is necessary to return this value inside this Promise because the response you already before
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

const signInUser = async ({ username, password }) => {
  const userFound = await UserSchema.findOne({ username: username })

  if (!userFound) {
    return null
  }

  const match = await bcrypt.compare(password, userFound.password)
  if (userFound && !match) {
    return null
  }

  const tmp = userFound.id
  const profile = await serviceProfile.profileIsHost({ tmp })
  if (profile) {
    return {
      profile,
      userId: tmp
    }
  } else {
    return {
      userId: tmp
    }
  }
}

module.exports = {
  createUser,
  signInUser
}
