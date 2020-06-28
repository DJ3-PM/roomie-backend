const bcrypt = require('bcrypt')
const UserSchema = require('../utils/schemas/users')

const createUser = async ({ user }) => {
  const { username, password, firstname, lastname } = user

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    username,
    password: hashedPassword,
    firstname,
    lastname
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
