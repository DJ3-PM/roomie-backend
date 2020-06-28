const ProfileSchema = require('../utils/schemas/profile')

const createProfile = ({ profile }) => {
  const myProfile = new ProfileSchema(profile)

  return new Promise((resolve, reject) => {
    myProfile.save((error, createdProfile) => {
      if (error) {
        reject(error)
      }

      resolve(createdProfile.id)
    })
  })
}

module.exports = {
  createProfile
}
