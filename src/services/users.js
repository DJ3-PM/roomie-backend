const bcrypt = require('bcrypt')
const UserSchema = require('../utils/schemas/user')

const createUser = async ({ user }) => {
  const { username, password } = user

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    username,
    password: hashedPassword
  }

  const myUser = new UserSchema(newUser)

  return new Promise((resolve, reject) => {
    myUser.save((error, createdUser) => {
      if (error) {
        reject(error)
      }

      resolve(createdUser.id)
    })
  })
}

module.exports = {
  createUser
}
