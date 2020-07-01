const favoritesResultMock = '5ef973c8c981cb0b85c89fe1'

const createFavorite = () => {
  return Promise.resolve(favoritesResultMock)
}

module.exports = {
  favoritesResultMock,
  favoritesServiceMock: {
    createFavorite
  }
}
