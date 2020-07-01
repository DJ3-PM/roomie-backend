const usersResultMock = '5efbd01078f3c704def5c707'

const createUser = () => {
  return Promise.resolve(usersResultMock)
}

module.exports = {
  usersResultMock,
  usersServiceMock: {
    createUser
  }
}
