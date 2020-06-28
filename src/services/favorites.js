const FavoriteSchema = require('../utils/schemas/favorite')

const createFavorite = ({ favorite }) => {
  const myFavorite = new FavoriteSchema(favorite)

  return new Promise((resolve, reject) => {
    myFavorite.save((error, createdFavorite) => {
      if (error) {
        reject(error)
      }

      resolve(createdFavorite.id)
    })
  })
}

module.exports = {
  createFavorite
}
